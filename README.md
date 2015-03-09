# paz-digitalocean

## Install

Having node or io.js installed,

```bash
$ npm install paz-digitalocean -g
```

## Setup

Setup access tokens for:

```bash
$ paz-digitalocean setup
digitalocean_api_token :
dnsimple_api_key : 
dnsimple_email :
Saved
```

## Create a cluster

```bash
$ paz-digitalocean cluster create
name: paz
discovery_url: https://discovery.etcd.io/7d008ca9885f004dddaa346103d369d2
region: lon1
size: 512mb
domain: pgte.me
SSH key fingerprint (empty to end): 18:04:e9:44:13:87:65:b0:0f:08:48:6f:c5:ae:c9:be
SSH key fingerprint (empty to end): 0d:95:01:9a:cc:a7:b5:f7:6b:1d:c9:3f:7d:c6:99:f4
SSH key fingerprint (empty to end):
About to create cluster
Saved user data in /Users/pedroteixeira/.paz-digitalocean/clusters/paz2/userdata
```

## Create a machine in the cluster

```bash
$ paz-digitalocean machine create paz 001
creating droplet...
created droplet 4404553.
polling until active...
Droplet 4404553 is active
IP addresses: [ { ip_address: '10.131.177.239',
    netmask: '255.255.0.0',
    gateway: '10.131.0.1',
    type: 'private' },
  { ip_address: '178.62.124.187',
    netmask: '255.255.192.0',
    gateway: '178.62.64.1',
    type: 'public' } ]
```

## License

ISC