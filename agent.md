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
⚙️ Injecting Firebase Admin init...
## 🎨 Checking frontend

up to date, audited 272 packages in 766ms

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
[32m✓ built in 1.93s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760193736.672779-d7ba867eb5a048bf9ca5bc15cbb27bed.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/0573e2d8-eaf2-452a-8020-1d035e1a18bc].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/0573e2d8-eaf2-452a-8020-1d035e1a18bc?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "0573e2d8-eaf2-452a-8020-1d035e1a18bc"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760193736.672779-d7ba867eb5a048bf9ca5bc15cbb27bed.tgz#1760193755075947
Copying gs://cleanpro-site_cloudbuild/source/1760193736.672779-d7ba867eb5a048bf9ca5bc15cbb27bed.tgz#1760193755075947...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/12 : FROM node:20-slim
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
Step 2/12 : WORKDIR /app/backend
 ---> Running in 7e5ddf398fc5
Removing intermediate container 7e5ddf398fc5
 ---> ced5086f8066
Step 3/12 : COPY package*.json ./
 ---> b5bd14f641f4
Step 4/12 : RUN npm install --production
 ---> Running in 26445ba00727
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 7s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 26445ba00727
 ---> 14c88238d758
Step 5/12 : COPY . .
 ---> b5ff06fff9e9
Step 6/12 : ENV PORT=8080
 ---> Running in 729c054c45a8
Removing intermediate container 729c054c45a8
 ---> 128dac5c67ae
Step 7/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 65cc1ca18da1
Removing intermediate container 65cc1ca18da1
 ---> f84fa17281cc
Step 8/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in eee547b1fddf
Removing intermediate container eee547b1fddf
 ---> 8c9b42d8e489
Step 9/12 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in fd25ca7fa78c
Removing intermediate container fd25ca7fa78c
 ---> 31c38eadf793
Step 10/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 5a0c151641bc
Removing intermediate container 5a0c151641bc
 ---> d820d9bc3cbc
Step 11/12 : EXPOSE 8080
 ---> Running in 09b299940dfa
Removing intermediate container 09b299940dfa
 ---> 2562149315e4
Step 12/12 : CMD ["npm","start"]
 ---> Running in 2daa51f80d6d
Removing intermediate container 2daa51f80d6d
 ---> acb8e690a923
Successfully built acb8e690a923
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
8f5a425a376f: Preparing
f612cf531fca: Preparing
2602df0046ec: Preparing
fad484782bb7: Preparing
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
2602df0046ec: Pushed
fad484782bb7: Pushed
aca836066730: Layer already exists
8ee6722b9ed5: Layer already exists
8f5a425a376f: Pushed
f612cf531fca: Pushed
latest: digest: sha256:134e1863b6b8c25d86897a2918dc4c5dd6db858c65768a2ffc4af46ef7c8f6bc size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
0573e2d8-eaf2-452a-8020-1d035e1a18bc  2025-10-11T14:42:35+00:00  60S       gs://cleanpro-site_cloudbuild/source/1760193736.672779-d7ba867eb5a048bf9ca5bc15cbb27bed.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy........................done
Creating Revision...............................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00421-qzv' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00421-qzv&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00421-qzv%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760193844.99408-b70fdd2ad1e04a1ba3b2062710896b5f.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/f1227317-cb53-4b6d-a22e-84da80294a0d].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/f1227317-cb53-4b6d-a22e-84da80294a0d?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "f1227317-cb53-4b6d-a22e-84da80294a0d"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760193844.99408-b70fdd2ad1e04a1ba3b2062710896b5f.tgz#1760193864053140
Copying gs://cleanpro-site_cloudbuild/source/1760193844.99408-b70fdd2ad1e04a1ba3b2062710896b5f.tgz#1760193864053140...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/12 : FROM node:20-slim
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
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/12 : WORKDIR /app/backend
 ---> Running in b6f27a983264
Removing intermediate container b6f27a983264
 ---> 45412f746329
Step 3/12 : COPY package*.json ./
 ---> e4835c88256a
Step 4/12 : RUN npm install --production
 ---> Running in 4e4f11e1742b
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 7s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 4e4f11e1742b
 ---> 6d8b2e784062
Step 5/12 : COPY . .
 ---> 9b623c478423
Step 6/12 : ENV PORT=8080
 ---> Running in 8d1241186583
Removing intermediate container 8d1241186583
 ---> 91550ff91000
Step 7/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 556a6a3ea9e3
Removing intermediate container 556a6a3ea9e3
 ---> abf68aac5462
Step 8/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in d636f7571ab1
Removing intermediate container d636f7571ab1
 ---> b3c63e2ebde4
Step 9/12 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 5eadb0fb8e26
Removing intermediate container 5eadb0fb8e26
 ---> 55c9e16e304f
Step 10/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 5248db3ca9b0
Removing intermediate container 5248db3ca9b0
 ---> a81ad1f0802c
Step 11/12 : EXPOSE 8080
 ---> Running in 2f98e9e5310b
Removing intermediate container 2f98e9e5310b
 ---> 339c92a933c5
Step 12/12 : CMD ["npm","start"]
 ---> Running in 40ab8f647fa0
Removing intermediate container 40ab8f647fa0
 ---> 4033e9b28cbe
Successfully built 4033e9b28cbe
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
008a87c0345d: Preparing
d079c9b64305: Preparing
c6c35fd5f4af: Preparing
9f1d9d8ad38f: Preparing
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
c6c35fd5f4af: Pushed
9f1d9d8ad38f: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
008a87c0345d: Pushed
d079c9b64305: Pushed
latest: digest: sha256:a674cb76ce561c5417f70e0238cb18e5719b34aa022b540fda2303b2854c52c6 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                      IMAGES                                           STATUS
f1227317-cb53-4b6d-a22e-84da80294a0d  2025-10-11T14:44:24+00:00  54S       gs://cleanpro-site_cloudbuild/source/1760193844.99408-b70fdd2ad1e04a1ba3b2062710896b5f.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision.....................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00422-n8k' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00422-n8k&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00422-n8k%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760193945.035088-6b93d990cdc8419188e7cbe4ea2a3ac6.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/80dd44e1-3cea-4217-8582-b6fc3c90494d].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/80dd44e1-3cea-4217-8582-b6fc3c90494d?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "80dd44e1-3cea-4217-8582-b6fc3c90494d"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760193945.035088-6b93d990cdc8419188e7cbe4ea2a3ac6.tgz#1760193964075326
Copying gs://cleanpro-site_cloudbuild/source/1760193945.035088-6b93d990cdc8419188e7cbe4ea2a3ac6.tgz#1760193964075326...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/12 : FROM node:20-slim
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
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
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
Step 2/12 : WORKDIR /app/backend
 ---> Running in c1c0b9739f4a
Removing intermediate container c1c0b9739f4a
 ---> 96ef47d0bcdc
Step 3/12 : COPY package*.json ./
 ---> 0bce2ad3f4f1
Step 4/12 : RUN npm install --production
 ---> Running in 8ffa8c8006cc
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 7s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 8ffa8c8006cc
 ---> 114636d080a3
Step 5/12 : COPY . .
 ---> 8cba8fb1338f
Step 6/12 : ENV PORT=8080
 ---> Running in 0efd4b85b136
Removing intermediate container 0efd4b85b136
 ---> 1d1eae753502
Step 7/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6ec2628c2614
Removing intermediate container 6ec2628c2614
 ---> f6a731602196
Step 8/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 20c3ba5a6f2e
Removing intermediate container 20c3ba5a6f2e
 ---> b9304ce160a5
Step 9/12 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 81d88a44ec7a
Removing intermediate container 81d88a44ec7a
 ---> 34a8e87c6a4b
Step 10/12 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 289fee701704
Removing intermediate container 289fee701704
 ---> 651488807f1a
Step 11/12 : EXPOSE 8080
 ---> Running in 7e1999ea0d05
Removing intermediate container 7e1999ea0d05
 ---> c809c9579888
Step 12/12 : CMD ["npm","start"]
 ---> Running in 7ea1d13629d3
Removing intermediate container 7ea1d13629d3
 ---> 323f74d34488
Successfully built 323f74d34488
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
fa826d6d86c4: Preparing
f114c25c196b: Preparing
45f493c4f9ec: Preparing
dc92a11099b1: Preparing
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
45f493c4f9ec: Pushed
dc92a11099b1: Pushed
8ee6722b9ed5: Layer already exists
7ace34a4ad78: Layer already exists
aca836066730: Layer already exists
fa826d6d86c4: Pushed
f114c25c196b: Pushed
latest: digest: sha256:906ddcd6f71cc65415a1dc4ed823b77a3db20f8e13fe67a1887ed55934b72dcd size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
80dd44e1-3cea-4217-8582-b6fc3c90494d  2025-10-11T14:46:04+00:00  57S       gs://cleanpro-site_cloudbuild/source/1760193945.035088-6b93d990cdc8419188e7cbe4ea2a3ac6.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision.................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00423-rvn' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00423-rvn&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00423-rvn%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 3 failed — reading Cloud Run logs...
──────────────────────────────
📋 Codox AI Master completed
Timestamp: 2025-10-11 14:47:30
✅ Full backend, frontend, DB, deploy cycle done.
✅ review_report.sh syntax verified
──────────────────────────────
🏁 End of review_report.sh (Codox Master Controller)
───────────────────────────
📊 End of Summary (auto-generated)
