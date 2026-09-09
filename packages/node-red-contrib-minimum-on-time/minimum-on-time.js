module.exports = function (RED) {
  function MinimumOnTimeNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    const DELAY_MS = Number(config.delayMs) || 30000;

    node.on('input', function (msg, send, done) {
      send = send || function () { node.send.apply(node, arguments); };

      const now = Date.now();
      let timer = node.context().get('timer');
      let timestampSet = node.context().get('timestamp_set');

      if (msg.payload === true) {
        if (timer) {
          clearTimeout(timer);
          node.context().set('timer', null);
        }
        if (!timestampSet) {
          node.context().set('timestamp_set', now);
        }
        node.status({ fill: 'green', shape: 'dot', text: 'true' });
        send({ payload: true });
        done();
        return;
      }

      if (msg.payload === false) {
        const elapsed = timestampSet ? (now - timestampSet) : DELAY_MS;
        const remaining = DELAY_MS - elapsed;

        if (remaining <= 0) {
          if (timer) {
            clearTimeout(timer);
            node.context().set('timer', null);
          }
          node.context().set('timestamp_set', null);
          node.status({ fill: 'grey', shape: 'dot', text: 'false (immediate)' });
          send({ payload: false });
          done();
          return;
        }

        if (timer) clearTimeout(timer);
        node.status({ fill: 'yellow', shape: 'ring', text: 'pending false' });
        timer = setTimeout(() => {
          node.status({ fill: 'grey', shape: 'dot', text: 'false' });
          send({ payload: false });
          node.context().set('timer', null);
          node.context().set('timestamp_set', null);
          done();
        }, remaining);
        node.context().set('timer', timer);
        return;
      }

      done();
    });

    node.on('close', function () {
      const timer = node.context().get('timer');
      if (timer) clearTimeout(timer);
    });
  }

  RED.nodes.registerType('minimum-on-time', MinimumOnTimeNode);
};
