# jnsjs

A JavaScript library for advanced front-end development.  

## Project Preparation

- support registerWithId function/interfaces with pr#1

## Table of Contents
- [Jump to Metadata Service section](#jns-metadata-service)  
- [Jump to Avatar Worker section](#jns-avatar-worker)  
- [Jump to Avatar Buckets section](#jns-avatar-buckets)  
- [Jump to Bridge Api section](#jns-bridge)  

# jns-metadata-service
<a name="jns-metadata-service"></a>

## Repository
[jns-metadata-service](https://github.com/jventures-jdn/jns-metadata-service)  

## About

NFT Metadata
The JNS Metadata Service provides NFT metadata for JNS names. It can be queried for any wrapped name, or any unwrapped .jfin 2LD.

To get the metadata for a name, call these endpoint:

- Mainnet
https://jns-metadata.jfinchain.com/jfin/{contractAddress}/{tokenId}

- Testnet
https://jns-metadata.testnet.jfinchain.com/jfin/{contractAddress}/{tokenId}

## Patches

In order for the avatar resolver to retrieve avatar uri or metadata for a given name, we need to patch a specific library (ethersproject/provider).

- Changing eth to jfin name check in base-provider.js
- Adding jfin/jfintestnet with the registry address to the network

## Project Preparation

- Disable vpcAccessConnect check in appconfgen.js
- Disable INAMEWRAPPER interface id check in service/contract.ts
- Disable isWrapped check for namehash in service/avatar.ts
- Add network, subgraph url, and rpc url to network.ts
- Replace https://metadata.ens.domains baseUrl with the deployed metadata-service url

## Cloud Run Deployment

Prepare docker-compose file with the following 
- eth_registrar address
- name_wrapper address
- name_manager address 
- rpc provider 
- subgraph url
- s3 bucket credentials

For dockerfile, we use bookworm node to reduce the image size

### Preparing image commands
```bash
docker build -t [HOSTNAME]/[PROJECT_ID]/[IMAGE] .
```  
eg. docker build -t asia.gcr.io/jfin-name-service/jns-metadata-service-testnet . 

After building the image, we then push it to the container registry.  
eg. docker push asia.gcr.io/jfin-name-service/jns-metadata-service-testnet

The containers are separated into two groups: testnet and mainnet.

### Using Google's Cloud Run

1. Navigate to the Cloud Run service.
2. Select the metadata service environment (either testnet or mainnet).
3. Select "Edit & Deploy New Revision."
4. Select the container image URL.
5. Recheck variables and secrets.

## Running dev server

```bash
yarn
yarn dev
```

# jns-avatar-worker
<a name="jns-avatar-worker"></a>

## Repository
[jns-avatar-worker](https://github.com/jventures-jdn/jns-avatar-worker)  

## About

Cloudflare worker that facilitates gasless avatar record updates.

## Cloudflare R2 Worker Deployment

- Modify wrangler.toml to include the service name, account id, bucket name
- Add registry, name wrapper, base registrar, multicall addresses to wrangler.toml. This includes the network info.

## Project Preparation

- Exclude "/" + network from base web3 endpoint in src/utils.ts
- Change tld check from eth to jfin in src/utils.ts

## Running dev server

```bash
pnpm
pnpm start
```

## How to deploy

```bash
pnpm publish
```

# jns-avatar-buckets
<a name="jns-avatar-buckets"></a>

## About

Storage for JNS avatar images.

In each environment, there are two buckets designated to segregate takedown name avatars from valid name avatars. 
Additionally, a unique token is generated for each environment to facilitate the management of S3 object copy and deletion.

## Mainnet

- jns
- jns-takedown

## Testnet

- jns-testnet
- jns-takedown-testnet

# jns-bridge
<a name="jns-bridge"></a> 

## About

A public API for resolving JNS names and addresses, which also includes additional endpoints for resolving text records. The API supports batch calls.

## Cloudflare R2 Worker Deployment

Modify wrangler.toml to include the following

- explorer url 
- rpc url
- multicall address
- multicall block number
- universal resolver address
- universal block number
- registry address
- registry block number
- admin contract address

Depending on the environment, modify the chain name object instance in the createENS method within utils.ts.

## Running dev server

```bash
yarn
yarn dev
```

## How to deploy

```bash
yarn deploy
```

## Documentation
[jns-bridge](https://documenter.getpostman.com/view/5492319/2sA35HWgHF)

## Repository
[jns-bridge](https://github.com/jventures-jdn/jns-bridge)

# jns-app-v3

