const express = require('express');
const { NodeSSH } = require('node-ssh');
const app = express();
const ssh = new NodeSSH();

app.use(express.json()); // Middleware für das Parsen von JSON im Anfragekörper

app.post('/runSSH', (req, res) => {
  const { host, port, username, password, command } = req.body;

  ssh.connect({ host, port, username, password })
    .then(() => {
      ssh.execCommand(command, { cwd:'/home' }).then((result) => {
        res.send('STDOUT: ' + result.stdout + ' STDERR: ' + result.stderr);
        ssh.dispose();
      }).catch(error => {
        res.status(500).send('Error executing command: ' + error);
        ssh.dispose();
      });
    })
    .catch(error => {
      res.status(500).send('Error connecting to server: ' + error);
    });
});

app.listen(3000, () => console.log('App listening on port 3000'));

