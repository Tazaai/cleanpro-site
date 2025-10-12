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

added 72 packages, and audited 346 packages in 2s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
## 🔥 Firebase Admin init check
## 🎨 Checking frontend API_BASE default
🩹 Checking frontend dependencies...
## 🎨 Checking frontend
🩹 Checking frontend dependencies...

up to date, audited 345 packages in 796ms

47 packages are looking for funding
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
[32m✓ built in 1.96s[39m
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
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760303948.161707-b1c4647e40314eb792e74ce7ee036ae0.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/5e6388af-7ba0-4bab-b992-dfe3cf816279].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/5e6388af-7ba0-4bab-b992-dfe3cf816279?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "5e6388af-7ba0-4bab-b992-dfe3cf816279"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760303948.161707-b1c4647e40314eb792e74ce7ee036ae0.tgz#1760303974361261
Copying gs://cleanpro-site_cloudbuild/source/1760303948.161707-b1c4647e40314eb792e74ce7ee036ae0.tgz#1760303974361261...
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
 ---> Running in 821b4d3ef436
Removing intermediate container 821b4d3ef436
 ---> 98d278a06821
Step 3/14 : COPY package*.json ./
 ---> ff3257ff59bf
Step 4/14 : RUN npm install --production
 ---> Running in 50ff66e44760
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 18s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 50ff66e44760
 ---> 65444d7db0e6
Step 5/14 : COPY . .
 ---> 276b552dfd79
Step 6/14 : ENV PORT=8080
 ---> Running in a017f7f68abf
Removing intermediate container a017f7f68abf
 ---> 28a96bdb7329
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0dbb4447a841
Removing intermediate container 0dbb4447a841
 ---> 7542515a1c01
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ba4556a7702f
Removing intermediate container ba4556a7702f
 ---> f9c9ba390b8b
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 5b075ba900ee
Removing intermediate container 5b075ba900ee
 ---> 93e578828102
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 840e342b1c0e
Removing intermediate container 840e342b1c0e
 ---> c27691ae7736
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 8277976528fe
Removing intermediate container 8277976528fe
 ---> 7d3e94098811
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in eb244fe6978a
Removing intermediate container eb244fe6978a
 ---> 12eee0dc7d69
Step 13/14 : EXPOSE 8080
 ---> Running in 24e2d5318f30
Removing intermediate container 24e2d5318f30
 ---> b00458339c11
Step 14/14 : CMD ["npm","start"]
 ---> Running in 16fd8b96d8e4
Removing intermediate container 16fd8b96d8e4
 ---> e209c3d549bf
Successfully built e209c3d549bf
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
84483c804d30: Preparing
f22f0e1f6c70: Preparing
77e21ffa9a72: Preparing
717c6cfec93a: Preparing
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
77e21ffa9a72: Pushed
717c6cfec93a: Pushed
7ace34a4ad78: Layer already exists
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
84483c804d30: Pushed
f22f0e1f6c70: Pushed
latest: digest: sha256:aa4260e89f4211f4593770eeefd575f65cc89a96a6322ab97fccb3c9cb8eac0e size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
5e6388af-7ba0-4bab-b992-dfe3cf816279  2025-10-12T21:19:34+00:00  1M51S     gs://cleanpro-site_cloudbuild/source/1760303948.161707-b1c4647e40314eb792e74ce7ee036ae0.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision..........................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00528-mh7' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00528-mh7&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00528-mh7%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760304146.687496-15b59204f993426bb2eb95e35156a02a.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/1cd6f3d4-752c-47ef-a957-47faedd1f73a].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/1cd6f3d4-752c-47ef-a957-47faedd1f73a?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "1cd6f3d4-752c-47ef-a957-47faedd1f73a"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760304146.687496-15b59204f993426bb2eb95e35156a02a.tgz#1760304173011159
Copying gs://cleanpro-site_cloudbuild/source/1760304146.687496-15b59204f993426bb2eb95e35156a02a.tgz#1760304173011159...
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
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
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
 ---> Running in 3953010fd86d
Removing intermediate container 3953010fd86d
 ---> b3658f8689f5
Step 3/14 : COPY package*.json ./
 ---> e98838c784a1
Step 4/14 : RUN npm install --production
 ---> Running in dbde5e4f9dda
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 20s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container dbde5e4f9dda
 ---> c315ad95e75b
Step 5/14 : COPY . .
 ---> a8c5342f54e2
Step 6/14 : ENV PORT=8080
 ---> Running in 551fe23c8f79
Removing intermediate container 551fe23c8f79
 ---> fa49fab93ffd
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6da42859c0ab
Removing intermediate container 6da42859c0ab
 ---> 87e6948e0327
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in a7ea7e29c8fc
Removing intermediate container a7ea7e29c8fc
 ---> 9129eb3b1848
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 5f250d2c0bde
Removing intermediate container 5f250d2c0bde
 ---> 9b42dae39069
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 3e6dc4ccafbe
Removing intermediate container 3e6dc4ccafbe
 ---> 6176654c72b5
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 552da99cad97
Removing intermediate container 552da99cad97
 ---> 454e4ebb3a95
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0ce76de87cf0
Removing intermediate container 0ce76de87cf0
 ---> c50f3b02d240
Step 13/14 : EXPOSE 8080
 ---> Running in adb9de0025c3
Removing intermediate container adb9de0025c3
 ---> 975e58d47b3e
Step 14/14 : CMD ["npm","start"]
 ---> Running in 4dba110c1a18
Removing intermediate container 4dba110c1a18
 ---> 7eab5ceab61e
Successfully built 7eab5ceab61e
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
7a2d1566144f: Preparing
1f343488ca64: Preparing
542211fa7c83: Preparing
1c2d4c81562c: Preparing
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
1c2d4c81562c: Pushed
542211fa7c83: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
7a2d1566144f: Pushed
1f343488ca64: Pushed
latest: digest: sha256:a8f4456c9ffefaac37aa87a73bf0879c8f1ba927ddd17b942738d424bff19b4c size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
1cd6f3d4-752c-47ef-a957-47faedd1f73a  2025-10-12T21:22:53+00:00  1M58S     gs://cleanpro-site_cloudbuild/source/1760304146.687496-15b59204f993426bb2eb95e35156a02a.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision.....................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00529-v6c' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00529-v6c&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00529-v6c%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760304365.853146-787b005cbf824a3c8d9cb9955bbb4fb9.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/69da2439-d7cf-48cd-a131-8da33ae95af4].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/69da2439-d7cf-48cd-a131-8da33ae95af4?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "69da2439-d7cf-48cd-a131-8da33ae95af4"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760304365.853146-787b005cbf824a3c8d9cb9955bbb4fb9.tgz#1760304390999180
Copying gs://cleanpro-site_cloudbuild/source/1760304365.853146-787b005cbf824a3c8d9cb9955bbb4fb9.tgz#1760304390999180...
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
997b350cffa1: Download complete
5c32499ab806: Download complete
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
 ---> Running in 99b3f14a4197
Removing intermediate container 99b3f14a4197
 ---> 36ef21362bd3
Step 3/14 : COPY package*.json ./
 ---> 2930f4bb49f7
Step 4/14 : RUN npm install --production
 ---> Running in 624430b03905
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 15s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 624430b03905
 ---> b72672252903
Step 5/14 : COPY . .
 ---> dd19c8c81905
Step 6/14 : ENV PORT=8080
 ---> Running in 4d36d5c15f51
Removing intermediate container 4d36d5c15f51
 ---> 7cc113a03434
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 14d379bb7650
Removing intermediate container 14d379bb7650
 ---> 837c663a3b8f
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 0b2c27e3f207
Removing intermediate container 0b2c27e3f207
 ---> 60fec8f293cd
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ec03314062eb
Removing intermediate container ec03314062eb
 ---> 919695e45db7
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 06b2420cf3c1
Removing intermediate container 06b2420cf3c1
 ---> 127b1298a1fb
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ca13cbc4fab0
Removing intermediate container ca13cbc4fab0
 ---> e76723ae7073
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9b41668979cf
Removing intermediate container 9b41668979cf
 ---> c8f3f96ce23a
Step 13/14 : EXPOSE 8080
 ---> Running in 4d218b470e01
Removing intermediate container 4d218b470e01
 ---> 5576a6d31cd8
Step 14/14 : CMD ["npm","start"]
 ---> Running in 6e21f23891d4
Removing intermediate container 6e21f23891d4
 ---> c8d71a8d454b
Successfully built c8d71a8d454b
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
c1f66a231ffb: Preparing
e1ce1474e43d: Preparing
31640dd91cf1: Preparing
f58aa77a13cc: Preparing
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
31640dd91cf1: Pushed
f58aa77a13cc: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
c1f66a231ffb: Pushed
e1ce1474e43d: Pushed
latest: digest: sha256:3b4fda5245007aa8c889d8fdbff54dc5127c12d7da1b32882dce7e1fedc7fe5c size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
69da2439-d7cf-48cd-a131-8da33ae95af4  2025-10-12T21:26:31+00:00  1M33S     gs://cleanpro-site_cloudbuild/source/1760304365.853146-787b005cbf824a3c8d9cb9955bbb4fb9.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...........................done
Creating Revision................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00530-nv5' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00530-nv5&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00530-nv5%22 
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
