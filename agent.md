## 🔑 Checking required secrets
✅ GOOGLE_MAPS_API_KEY present
✅ GCP_PROJECT present
✅ GCP_SA_KEY present
✅ FIREBASE_KEY present
## �� Validating project structure
✅ Structure verified.
## 🐳 Checking backend/Dockerfile
✅ Dockerfile ready.
## 🧠 Checking backend routes
✅ services_api present
✅ bookings_api present
✅ quotes_api present
✅ pricing_api present
✅ calendar_api present
✅ coordination_points_api present
✅ config_api present
✅ Route check complete.
## 🔥 Firebase Admin init check
## 🎨 Checking frontend

up to date, audited 272 packages in 796ms

42 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

> cleanpro-frontend@1.0.0 build
> vite build

[36mvite v4.5.14 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 69 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.70 kB[22m[1m[22m[2m │ gzip:  0.40 kB[22m
[2mdist/[22m[2massets/[22m[35mindex-39fedcd9.css  [39m[1m[2m 16.10 kB[22m[1m[22m[2m │ gzip:  3.73 kB[22m
[2mdist/[22m[2massets/[22m[36mindex-b4cf7e65.js   [39m[1m[2m201.34 kB[22m[1m[22m[2m │ gzip: 63.48 kB[22m
[32m✓ built in 2.00s[39m
## 🗄️ Checking Firebase structure
node:internal/modules/esm/resolve:873
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'firebase-admin' imported from /home/runner/work/cleanpro-site/cleanpro-site/[eval1]
    at packageResolve (node:internal/modules/esm/resolve:873:9)
    at moduleResolve (node:internal/modules/esm/resolve:946:18)
    at defaultResolve (node:internal/modules/esm/resolve:1188:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:708:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:657:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:640:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:264:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:168:49)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v20.19.5
## ☁️ Deploy & log review
🧠 Attempt 1/3
[33m-[39m Cloning the repository...
[32m✔[39m Repository cloned successfully
run cd fix && pnpm install && pnpm dev
Happy Coding! 💻
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760195544.29489-d0defba957b142bdb4a6e909344d0a05.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/d4644f21-ade4-4aed-8703-c49dc65168b9].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/d4644f21-ade4-4aed-8703-c49dc65168b9?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "d4644f21-ade4-4aed-8703-c49dc65168b9"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760195544.29489-d0defba957b142bdb4a6e909344d0a05.tgz#1760195563955473
Copying gs://cleanpro-site_cloudbuild/source/1760195544.29489-d0defba957b142bdb4a6e909344d0a05.tgz#1760195563955473...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/14 : FROM node:20-slim
20-slim: Pulling from library/node
5c32499ab806: Pulling fs layer
c236995d12f2: Pulling fs layer
ab9c5ae25e4d: Pulling fs layer
997b350cffa1: Pulling fs layer
cc663995c53d: Pulling fs layer
997b350cffa1: Waiting
cc663995c53d: Waiting
c236995d12f2: Verifying Checksum
c236995d12f2: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
ab9c5ae25e4d: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/14 : WORKDIR /app/backend
 ---> Running in d68e1f8bd3fb
Removing intermediate container d68e1f8bd3fb
 ---> e51af95f2d5a
Step 3/14 : COPY package*.json ./
 ---> f191d9cc2520
Step 4/14 : RUN npm install --production
 ---> Running in f1649dcd2eb0
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 9s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container f1649dcd2eb0
 ---> 918013b92d40
Step 5/14 : COPY . .
 ---> 307cef3fdcf6
Step 6/14 : ENV PORT=8080
 ---> Running in 021ccf4b260b
Removing intermediate container 021ccf4b260b
 ---> 557365c78c37
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 881b18655a9c
Removing intermediate container 881b18655a9c
 ---> fb0c17c9bd16
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 7463cde5b3c5
Removing intermediate container 7463cde5b3c5
 ---> 55784956989d
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in fb63208b5c09
Removing intermediate container fb63208b5c09
 ---> a3810cc16ffd
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7b5191f9e455
Removing intermediate container 7b5191f9e455
 ---> f6d5fe014386
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in e3e7567af56a
Removing intermediate container e3e7567af56a
 ---> 252b1249b10c
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9bf498b6a58c
Removing intermediate container 9bf498b6a58c
 ---> 8db994a7c803
Step 13/14 : EXPOSE 8080
 ---> Running in da393ca86eca
Removing intermediate container da393ca86eca
 ---> e488a7c5d4d6
Step 14/14 : CMD ["npm","start"]
 ---> Running in d1f37b665042
Removing intermediate container d1f37b665042
 ---> 8b577366f37a
Successfully built 8b577366f37a
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
cf56d0d4a6ce: Preparing
3168a27a4558: Preparing
35e330dc3e3f: Preparing
9e3b79b25610: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
e07dd166a3a3: Waiting
aca836066730: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
9e3b79b25610: Pushed
35e330dc3e3f: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
cf56d0d4a6ce: Pushed
3168a27a4558: Pushed
latest: digest: sha256:7735d9a7e1ac04c8fde4a40fc65f44db4e0e8131fe03d03303bb0b5d5e14bd0c size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                      IMAGES                                           STATUS
d4644f21-ade4-4aed-8703-c49dc65168b9  2025-10-11T15:12:44+00:00  1M2S      gs://cleanpro-site_cloudbuild/source/1760195544.29489-d0defba957b142bdb4a6e909344d0a05.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...........................done
Creating Revision...................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00429-t5t' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00429-t5t&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00429-t5t%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760195677.550538-b79997e6af3740ad8e18fad441eaf185.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/7d4a5fbb-6c44-4d8e-95a4-aaac6a0a4921].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/7d4a5fbb-6c44-4d8e-95a4-aaac6a0a4921?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "7d4a5fbb-6c44-4d8e-95a4-aaac6a0a4921"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760195677.550538-b79997e6af3740ad8e18fad441eaf185.tgz#1760195696836656
Copying gs://cleanpro-site_cloudbuild/source/1760195677.550538-b79997e6af3740ad8e18fad441eaf185.tgz#1760195696836656...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/14 : FROM node:20-slim
20-slim: Pulling from library/node
5c32499ab806: Pulling fs layer
c236995d12f2: Pulling fs layer
ab9c5ae25e4d: Pulling fs layer
997b350cffa1: Pulling fs layer
cc663995c53d: Pulling fs layer
997b350cffa1: Waiting
cc663995c53d: Waiting
c236995d12f2: Verifying Checksum
c236995d12f2: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/14 : WORKDIR /app/backend
 ---> Running in 740f6cffc6c2
Removing intermediate container 740f6cffc6c2
 ---> 658479213089
Step 3/14 : COPY package*.json ./
 ---> af1f2c9f6316
Step 4/14 : RUN npm install --production
 ---> Running in 327e8c9997dc
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 8s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 327e8c9997dc
 ---> 2fe21cc7a7b6
Step 5/14 : COPY . .
 ---> ad86ca813d26
Step 6/14 : ENV PORT=8080
 ---> Running in 3ec53773e5f2
Removing intermediate container 3ec53773e5f2
 ---> 0e10d30b88de
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 1c73eeb4981f
Removing intermediate container 1c73eeb4981f
 ---> bea08a9c9f5e
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 15002ddf52b7
Removing intermediate container 15002ddf52b7
 ---> ee573e768d72
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in d33bb1e74653
Removing intermediate container d33bb1e74653
 ---> 0e2f3e7cd938
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in a2057fc54947
Removing intermediate container a2057fc54947
 ---> 25174386af57
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 8ecc2cdd4126
Removing intermediate container 8ecc2cdd4126
 ---> b369ce8af4f4
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 220381067db1
Removing intermediate container 220381067db1
 ---> e3a6e2dfad3e
Step 13/14 : EXPOSE 8080
 ---> Running in abe54ac12617
Removing intermediate container abe54ac12617
 ---> 2fa31205ddcf
Step 14/14 : CMD ["npm","start"]
 ---> Running in ab41af5dbc8f
Removing intermediate container ab41af5dbc8f
 ---> ebe10441b92e
Successfully built ebe10441b92e
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
3c951b58b4c1: Preparing
b89a3a09a406: Preparing
0c3cea7e5765: Preparing
e7afe17e2d9c: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
e07dd166a3a3: Waiting
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
e7afe17e2d9c: Pushed
0c3cea7e5765: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
3c951b58b4c1: Pushed
b89a3a09a406: Pushed
latest: digest: sha256:bfc40cea9e13815cac62f1458372fbaa25a908a12d8fbef9c91115654dcc6358 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
7d4a5fbb-6c44-4d8e-95a4-aaac6a0a4921  2025-10-11T15:14:57+00:00  54S       gs://cleanpro-site_cloudbuild/source/1760195677.550538-b79997e6af3740ad8e18fad441eaf185.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy............................done
Creating Revision............................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00430-98z' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00430-98z&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00430-98z%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760195785.616476-64af6c8973bc46cfb8f012cb4b227c8f.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/792d68b3-3bb9-4803-8188-4ddecb851c53].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/792d68b3-3bb9-4803-8188-4ddecb851c53?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "792d68b3-3bb9-4803-8188-4ddecb851c53"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760195785.616476-64af6c8973bc46cfb8f012cb4b227c8f.tgz#1760195804998218
Copying gs://cleanpro-site_cloudbuild/source/1760195785.616476-64af6c8973bc46cfb8f012cb4b227c8f.tgz#1760195804998218...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/14 : FROM node:20-slim
20-slim: Pulling from library/node
5c32499ab806: Pulling fs layer
c236995d12f2: Pulling fs layer
ab9c5ae25e4d: Pulling fs layer
997b350cffa1: Pulling fs layer
cc663995c53d: Pulling fs layer
997b350cffa1: Waiting
cc663995c53d: Waiting
c236995d12f2: Verifying Checksum
c236995d12f2: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/14 : WORKDIR /app/backend
 ---> Running in 264130d4af1b
Removing intermediate container 264130d4af1b
 ---> a0dfdb15ebaa
Step 3/14 : COPY package*.json ./
 ---> e06542823d5d
Step 4/14 : RUN npm install --production
 ---> Running in 8bbe6b607279
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 8s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 8bbe6b607279
 ---> f001c263a70a
Step 5/14 : COPY . .
 ---> de8754f9d018
Step 6/14 : ENV PORT=8080
 ---> Running in 3114c777af2a
Removing intermediate container 3114c777af2a
 ---> a1e45ea59313
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9874a4d7dd09
Removing intermediate container 9874a4d7dd09
 ---> 5422ed467236
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 0e2851e467a0
Removing intermediate container 0e2851e467a0
 ---> 364fb321a86d
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in d25e551c5c0a
Removing intermediate container d25e551c5c0a
 ---> c001d3813ec8
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in c197fdf1b954
Removing intermediate container c197fdf1b954
 ---> 5084d8706e2e
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in e2b128e4dee4
Removing intermediate container e2b128e4dee4
 ---> 5c79a89ec170
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 3b9ac5613be6
Removing intermediate container 3b9ac5613be6
 ---> 614dacf72ea8
Step 13/14 : EXPOSE 8080
 ---> Running in 910b7227eb8d
Removing intermediate container 910b7227eb8d
 ---> cd9d1149f178
Step 14/14 : CMD ["npm","start"]
 ---> Running in a1bf3729f690
Removing intermediate container a1bf3729f690
 ---> 25e4689bb59c
Successfully built 25e4689bb59c
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
555e3c02feb0: Preparing
6e733ad35856: Preparing
d33da4507c7a: Preparing
b5c319476c2c: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
e07dd166a3a3: Waiting
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
b5c319476c2c: Pushed
8ee6722b9ed5: Layer already exists
d33da4507c7a: Pushed
aca836066730: Layer already exists
555e3c02feb0: Pushed
6e733ad35856: Pushed
latest: digest: sha256:55a6a221d25585fc03952b2ee85448e39e00401a0e2aa3428e5adc713e16be9c size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
792d68b3-3bb9-4803-8188-4ddecb851c53  2025-10-11T15:16:45+00:00  54S       gs://cleanpro-site_cloudbuild/source/1760195785.616476-64af6c8973bc46cfb8f012cb4b227c8f.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy..........................done
Creating Revision.......................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00431-ghv' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00431-ghv&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00431-ghv%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 3 failed — reading Cloud Run logs...
## 🧪 Running backend & frontend tests
Testing backend at: https://cleanpro-backend-5539254765.europe-west1.run.app

=== Health check ===
✅ CleanPro Backend is running (HTTP 200)

=== Services ===
{"ok":true,"services":[{"id":"residential_cleaning","name":"Residential Cleaning"},{"id":"deep_cleaning","name":"Deep Cleaning"},{"id":"office_cleaning","name":"Office Cleaning"},{"id":"move_inout_cleaning","name":"Move In/Out Cleaning"}]} (HTTP 200)

=== Pricing ===
{"ok":true,"pricing":{"residential_cleaning":{"pricePerM2":1.8,"weeklyDiscount":0.1,"monthlyDiscount":0.05},"deep_cleaning":{"pricePerM2":2.5,"weeklyDiscount":0.05,"monthlyDiscount":0.02},"office_cleaning":{"pricePerM2":2,"weeklyDiscount":0.08,"monthlyDiscount":0.03}}} (HTTP 200)

=== Calendar ===
{"ok":false,"error":"Calendar fetch failed"} (HTTP 500)

=== Maps distance ===
{"destination_addresses":[],"error_message":"The provided API key is expired. ","origin_addresses":[],"rows":[],"status":"REQUEST_DENIED"} (HTTP 200)

=== Google Calendar ===
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/gcalendar</pre>
</body>
</html>
 (HTTP 404)

=== HQs ===
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/hqs</pre>
</body>
</html>
 (HTTP 404)

Testing frontend at: https://cleanpro-frontend-5539254765.europe-west1.run.app

=== Route / ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/ → (HTTP 200)

=== Route /booking ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/booking → (HTTP 200)

=== Route /contact ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/contact → (HTTP 200)

=== Route /about ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/about → (HTTP 200)

=== Assets (auto-detected) ===
assets/index-39fedcd9.css → (HTTP 200)
assets/index-b4cf7e65.js → (HTTP 200)

=== Broken links check (homepage only) ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/assets/index-39fedcd9.css → (HTTP 200)
https://cleanpro-frontend-5539254765.europe-west1.run.app/vite.svg → (HTTP 200)

=== API base check ===

=== Homepage snippet ===
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clean Departure</title>

    <!-- Material Design Lite (optional styling) -->
    <link
      rel="stylesheet"
      href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"
    />
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script type="module" crossorigin src="/assets/index-b4cf7e65.js"></script>
    <link rel="stylesheet" href="/assets/index-39fedcd9.css">
  </head>
  <body>
    <div id="root"></div>
    

=== Browser console errors/warnings ===
node:internal/modules/esm/resolve:873
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'puppeteer' imported from /home/runner/work/cleanpro-site/cleanpro-site/[eval1]
    at packageResolve (node:internal/modules/esm/resolve:873:9)
    at moduleResolve (node:internal/modules/esm/resolve:946:18)
    at defaultResolve (node:internal/modules/esm/resolve:1188:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:708:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:657:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:640:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:264:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:168:49)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v20.19.5
❌ Frontend tests failed
