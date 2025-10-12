## ## Reading PROJECT_GUIDE.md for context...
## 🔧 Ensuring firebase_config.json exists in all paths
skip firebase_config.json in local context
🩹 Created missing ./backend/firebase_config.json
skip firebase_config.json in local context
🩹 Created missing /app/firebase_config.json
## 🧩 Auto-healing project structure from PROJECT_GUIDE.md
## 🔑 Checking required secrets
✅ GOOGLE_MAPS_API_KEY present
✅ GCP_PROJECT present
✅ GCP_SA_KEY present
✅ FIREBASE_KEY present
## ## Validating project structure
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
## �� Auto-installing missing backend packages

added 72 packages, and audited 346 packages in 7s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
## 🔥 Firebase Admin init check
## 🎨 Checking frontend API_BASE default
## 🎨 Checking frontend

up to date, audited 272 packages in 743ms

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
[32m✓ built in 1.90s[39m
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
🧩 Synced firebase_config.json to root and /app/
## ☁️ Deploy & log review
🧠 Attempt 1/3
[33m-[39m Cloning the repository...
[32m✔[39m Repository cloned successfully
run cd fix && pnpm install && pnpm dev
Happy Coding! 💻
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760301676.997517-9caf6481a4b3440299c14850bf1a7031.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/2e2f56a7-9b10-47e7-bcce-250b4ffc1b18].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/2e2f56a7-9b10-47e7-bcce-250b4ffc1b18?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "2e2f56a7-9b10-47e7-bcce-250b4ffc1b18"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760301676.997517-9caf6481a4b3440299c14850bf1a7031.tgz#1760301703204947
Copying gs://cleanpro-site_cloudbuild/source/1760301676.997517-9caf6481a4b3440299c14850bf1a7031.tgz#1760301703204947...
/ [0 files][    0.0 B/ 29.3 MiB]                                                / [1 files][ 29.3 MiB/ 29.3 MiB]                                                
Operation completed over 1 objects/29.3 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    223MB
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
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
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
Step 2/14 : WORKDIR /app/backend
 ---> Running in 2dbf22b36230
Removing intermediate container 2dbf22b36230
 ---> 60c445cc4410
Step 3/14 : COPY package*.json ./
 ---> 40a187fdcf6b
Step 4/14 : RUN npm install --production
 ---> Running in 75e84ee2cb18
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 24s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 75e84ee2cb18
 ---> ec9e884d5fcc
Step 5/14 : COPY . .
 ---> fdb4b1044d77
Step 6/14 : ENV PORT=8080
 ---> Running in 9bbe00313d1b
Removing intermediate container 9bbe00313d1b
 ---> ca417123ea83
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in efec872520d0
Removing intermediate container efec872520d0
 ---> 19a3d133791c
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in d2042a048aea
Removing intermediate container d2042a048aea
 ---> e7621c6b425f
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0bbf3a26dec6
Removing intermediate container 0bbf3a26dec6
 ---> 85a7382ea9bf
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 4e087c235c22
Removing intermediate container 4e087c235c22
 ---> 927d7ab49c17
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 828fe5a84122
Removing intermediate container 828fe5a84122
 ---> c4b89afc122d
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in a6ddedc72507
Removing intermediate container a6ddedc72507
 ---> b75193e23392
Step 13/14 : EXPOSE 8080
 ---> Running in 35def2c50dde
Removing intermediate container 35def2c50dde
 ---> ea97b0d81c4c
Step 14/14 : CMD ["npm","start"]
 ---> Running in 30e044c41efb
Removing intermediate container 30e044c41efb
 ---> 55067fef80ea
Successfully built 55067fef80ea
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
e6379a69a616: Preparing
3edd20949499: Preparing
3e7b801ef53a: Preparing
de6c4f867375: Preparing
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
3e7b801ef53a: Pushed
de6c4f867375: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
e6379a69a616: Pushed
3edd20949499: Pushed
latest: digest: sha256:ab713d623ec31e1403e3c5faca8e63c2e47231ec4c45f1f52fa5d6e7fc6fa8ef size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
2e2f56a7-9b10-47e7-bcce-250b4ffc1b18  2025-10-12T20:41:43+00:00  2M22S     gs://cleanpro-site_cloudbuild/source/1760301676.997517-9caf6481a4b3440299c14850bf1a7031.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision..........................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00524-gw5' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00524-gw5&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00524-gw5%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760301906.136885-05ecb24bfc654f42966ef383edd35e69.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/12448d62-b15f-4f61-b978-dcac8d459f72].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/12448d62-b15f-4f61-b978-dcac8d459f72?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "12448d62-b15f-4f61-b978-dcac8d459f72"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760301906.136885-05ecb24bfc654f42966ef383edd35e69.tgz#1760301931161503
Copying gs://cleanpro-site_cloudbuild/source/1760301906.136885-05ecb24bfc654f42966ef383edd35e69.tgz#1760301931161503...
/ [0 files][    0.0 B/ 29.3 MiB]                                                / [1 files][ 29.3 MiB/ 29.3 MiB]                                                
Operation completed over 1 objects/29.3 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    223MB
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
 ---> Running in e1813180fa1c
Removing intermediate container e1813180fa1c
 ---> da8785a74e94
Step 3/14 : COPY package*.json ./
 ---> d8a67b85e724
Step 4/14 : RUN npm install --production
 ---> Running in 7adc5b24c624
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 21s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 7adc5b24c624
 ---> 7586948fe57a
Step 5/14 : COPY . .
 ---> 0f4a65f785f2
Step 6/14 : ENV PORT=8080
 ---> Running in 6343fec0b804
Removing intermediate container 6343fec0b804
 ---> 0bdaa43feee6
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6b5547504ddc
Removing intermediate container 6b5547504ddc
 ---> bcd9ca087ef1
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 11203d2c3313
Removing intermediate container 11203d2c3313
 ---> da7588df5239
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9462e965d486
Removing intermediate container 9462e965d486
 ---> 133fcc095405
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in bcb8daed57de
Removing intermediate container bcb8daed57de
 ---> c8a5701e775c
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 6d111f8d5c94
Removing intermediate container 6d111f8d5c94
 ---> d22358b3e156
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 663736347ce0
Removing intermediate container 663736347ce0
 ---> 745f5a4efdb4
Step 13/14 : EXPOSE 8080
 ---> Running in 671a329efd2c
Removing intermediate container 671a329efd2c
 ---> 65c68d284fea
Step 14/14 : CMD ["npm","start"]
 ---> Running in 1d4748dabcc5
Removing intermediate container 1d4748dabcc5
 ---> f88d351c1c61
Successfully built f88d351c1c61
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
8b33ad5d11e5: Preparing
1fb80a3eb89c: Preparing
c18c2f099ecf: Preparing
6e74f406fa3e: Preparing
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
c18c2f099ecf: Pushed
7ace34a4ad78: Layer already exists
6e74f406fa3e: Pushed
aca836066730: Layer already exists
8ee6722b9ed5: Layer already exists
8b33ad5d11e5: Pushed
1fb80a3eb89c: Pushed
latest: digest: sha256:0d866c40ffdde933f54e07b0e2f115c46d9d9a2ebb43bd6639fdd0a3e6d3dd15 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
12448d62-b15f-4f61-b978-dcac8d459f72  2025-10-12T20:45:31+00:00  1M58S     gs://cleanpro-site_cloudbuild/source/1760301906.136885-05ecb24bfc654f42966ef383edd35e69.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.......................done
Creating Revision..................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00525-f9n' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00525-f9n&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00525-f9n%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760302102.803164-91c2bfd5292a4fcd8ebe30d004e30a78.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/a5cb8127-0206-4eb0-84a3-909cbd67180b].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/a5cb8127-0206-4eb0-84a3-909cbd67180b?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "a5cb8127-0206-4eb0-84a3-909cbd67180b"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760302102.803164-91c2bfd5292a4fcd8ebe30d004e30a78.tgz#1760302127904319
Copying gs://cleanpro-site_cloudbuild/source/1760302102.803164-91c2bfd5292a4fcd8ebe30d004e30a78.tgz#1760302127904319...
/ [0 files][    0.0 B/ 29.3 MiB]                                                / [1 files][ 29.3 MiB/ 29.3 MiB]                                                
Operation completed over 1 objects/29.3 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    223MB
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
 ---> Running in 76f79c75cae1
Removing intermediate container 76f79c75cae1
 ---> 18d3a7597538
Step 3/14 : COPY package*.json ./
 ---> a788bc6132e5
Step 4/14 : RUN npm install --production
 ---> Running in de67a3bf43e7
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 21s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container de67a3bf43e7
 ---> 4bd8d6c49bf2
Step 5/14 : COPY . .
 ---> cd7f4373a97f
Step 6/14 : ENV PORT=8080
 ---> Running in f9b5adc82bbb
Removing intermediate container f9b5adc82bbb
 ---> 51ba442a5665
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 1ec22c39566a
Removing intermediate container 1ec22c39566a
 ---> a5bc00a5d673
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 63e3034aa82c
Removing intermediate container 63e3034aa82c
 ---> 4a42152012b9
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 415e0f54ae27
Removing intermediate container 415e0f54ae27
 ---> b4323db0f556
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 217cc46242ec
Removing intermediate container 217cc46242ec
 ---> a66ff255adac
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 0608d36da9d9
Removing intermediate container 0608d36da9d9
 ---> 55dfc6ef5af2
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 83110f16413b
Removing intermediate container 83110f16413b
 ---> 491f13611bc9
Step 13/14 : EXPOSE 8080
 ---> Running in 52f4e78ca72d
Removing intermediate container 52f4e78ca72d
 ---> 42d1d74501e3
Step 14/14 : CMD ["npm","start"]
 ---> Running in 4c97e21d1321
Removing intermediate container 4c97e21d1321
 ---> 1dbdfc265903
Successfully built 1dbdfc265903
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
7703b9462bbf: Preparing
47ae53673c50: Preparing
df33b68e3b69: Preparing
feba0caf8a2a: Preparing
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
df33b68e3b69: Pushed
feba0caf8a2a: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
7703b9462bbf: Pushed
47ae53673c50: Pushed
latest: digest: sha256:1fa6fc58cc0b6ca01ee7ce89453aa17102c70ea1f7e5c89627c95ca617ebb6af size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
a5cb8127-0206-4eb0-84a3-909cbd67180b  2025-10-12T20:48:48+00:00  2M2S      gs://cleanpro-site_cloudbuild/source/1760302102.803164-91c2bfd5292a4fcd8ebe30d004e30a78.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy........................done
Creating Revision...............................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00526-mrm' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00526-mrm&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00526-mrm%22 
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
