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

up to date, audited 272 packages in 758ms

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
[32m✓ built in 1.97s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760300205.633112-4997a2e3d9e143aa9c5e11b49e9bf6ad.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/4686ab87-6f72-43c2-a8db-27e5b715d5f5].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/4686ab87-6f72-43c2-a8db-27e5b715d5f5?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "4686ab87-6f72-43c2-a8db-27e5b715d5f5"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760300205.633112-4997a2e3d9e143aa9c5e11b49e9bf6ad.tgz#1760300230472378
Copying gs://cleanpro-site_cloudbuild/source/1760300205.633112-4997a2e3d9e143aa9c5e11b49e9bf6ad.tgz#1760300230472378...
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
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
5c32499ab806: Verifying Checksum
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
 ---> Running in 868c510d1af6
Removing intermediate container 868c510d1af6
 ---> 8e95a11e8294
Step 3/14 : COPY package*.json ./
 ---> 90a6b21baad8
Step 4/14 : RUN npm install --production
 ---> Running in 67f342d9d5df
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 22s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 67f342d9d5df
 ---> a15537dd89a8
Step 5/14 : COPY . .
 ---> 83514c7a54e7
Step 6/14 : ENV PORT=8080
 ---> Running in fa1cf3b19054
Removing intermediate container fa1cf3b19054
 ---> 6bf77354a1ca
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7eef36d1150a
Removing intermediate container 7eef36d1150a
 ---> 9fac253fa9ed
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 08da40febd34
Removing intermediate container 08da40febd34
 ---> 27a9e86cf3a4
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 3c2f4fcb51d7
Removing intermediate container 3c2f4fcb51d7
 ---> beda3cfc720d
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ec5c4cb9fa7e
Removing intermediate container ec5c4cb9fa7e
 ---> b644b6add2ed
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in eb3f89905663
Removing intermediate container eb3f89905663
 ---> 30ea9c5a9b11
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6d7e1f837e74
Removing intermediate container 6d7e1f837e74
 ---> 815ce87e1c9a
Step 13/14 : EXPOSE 8080
 ---> Running in ce5f0af0ac26
Removing intermediate container ce5f0af0ac26
 ---> ca8d39a667cc
Step 14/14 : CMD ["npm","start"]
 ---> Running in a14aaaf88534
Removing intermediate container a14aaaf88534
 ---> 235a8c4bdacb
Successfully built 235a8c4bdacb
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
6f876d02babc: Preparing
488e17bfb647: Preparing
2bc4d7755a71: Preparing
4252bfa14849: Preparing
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
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
4252bfa14849: Pushed
2bc4d7755a71: Pushed
6f876d02babc: Pushed
488e17bfb647: Pushed
latest: digest: sha256:002e72394fee8b47045a1c5de0f6b3ce63432c4bb3862ad77609b4c81f20586f size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
4686ab87-6f72-43c2-a8db-27e5b715d5f5  2025-10-12T20:17:10+00:00  2M3S      gs://cleanpro-site_cloudbuild/source/1760300205.633112-4997a2e3d9e143aa9c5e11b49e9bf6ad.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision...............................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00520-95w' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00520-95w&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00520-95w%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760300414.893718-f636bb176c014c588860eeefb80391eb.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/4c801eca-2466-4037-abbb-eab88eb8856a].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/4c801eca-2466-4037-abbb-eab88eb8856a?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "4c801eca-2466-4037-abbb-eab88eb8856a"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760300414.893718-f636bb176c014c588860eeefb80391eb.tgz#1760300439912654
Copying gs://cleanpro-site_cloudbuild/source/1760300414.893718-f636bb176c014c588860eeefb80391eb.tgz#1760300439912654...
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
 ---> Running in 2118b7ba1e3e
Removing intermediate container 2118b7ba1e3e
 ---> d691cbded8e5
Step 3/14 : COPY package*.json ./
 ---> b53d033f580c
Step 4/14 : RUN npm install --production
 ---> Running in e3c03ee90fa4
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
[0mRemoving intermediate container e3c03ee90fa4
 ---> 395b5575a96c
Step 5/14 : COPY . .
 ---> 2879fd22facd
Step 6/14 : ENV PORT=8080
 ---> Running in 86f33455d900
Removing intermediate container 86f33455d900
 ---> 3df832640152
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0010ee7914ec
Removing intermediate container 0010ee7914ec
 ---> 1bbde6ce4afb
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 25c0a511d79d
Removing intermediate container 25c0a511d79d
 ---> d3aea6909b41
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 95d95fc4baa5
Removing intermediate container 95d95fc4baa5
 ---> 9311bae6c172
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 934129f58ef4
Removing intermediate container 934129f58ef4
 ---> 382f953fd096
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in e74fd523427c
Removing intermediate container e74fd523427c
 ---> 62c4c3206105
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7c9d18c4b0b5
Removing intermediate container 7c9d18c4b0b5
 ---> a1e9d6055a6b
Step 13/14 : EXPOSE 8080
 ---> Running in e70f40b209ef
Removing intermediate container e70f40b209ef
 ---> e8ae28687d0f
Step 14/14 : CMD ["npm","start"]
 ---> Running in 95044d0a1f0d
Removing intermediate container 95044d0a1f0d
 ---> 9b8d2843aded
Successfully built 9b8d2843aded
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
42d1fef5253f: Preparing
66f3daa998e5: Preparing
319c3d9d6fb2: Preparing
b1ef769d4dae: Preparing
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
b1ef769d4dae: Pushed
8ee6722b9ed5: Layer already exists
319c3d9d6fb2: Pushed
aca836066730: Layer already exists
42d1fef5253f: Pushed
66f3daa998e5: Pushed
latest: digest: sha256:021ba1d6d9cacf0d2cb9be554506322e1935a97626854f86d15e227b285b540f size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
4c801eca-2466-4037-abbb-eab88eb8856a  2025-10-12T20:20:40+00:00  1M57S     gs://cleanpro-site_cloudbuild/source/1760300414.893718-f636bb176c014c588860eeefb80391eb.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy........................done
Creating Revision...............................................................................................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00521-5cl' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00521-5cl&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00521-5cl%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760300625.184506-97eff9107120487f857b754f785f9818.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/8c6cf20d-82de-4ac3-a15a-1f2275e05ecf].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/8c6cf20d-82de-4ac3-a15a-1f2275e05ecf?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "8c6cf20d-82de-4ac3-a15a-1f2275e05ecf"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760300625.184506-97eff9107120487f857b754f785f9818.tgz#1760300651469419
Copying gs://cleanpro-site_cloudbuild/source/1760300625.184506-97eff9107120487f857b754f785f9818.tgz#1760300651469419...
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
c236995d12f2: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
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
 ---> Running in ea2597ee6aa7
Removing intermediate container ea2597ee6aa7
 ---> c7934dfd6ddc
Step 3/14 : COPY package*.json ./
 ---> 3fa67c1ff7e2
Step 4/14 : RUN npm install --production
 ---> Running in cd00806f58bd
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
[0mRemoving intermediate container cd00806f58bd
 ---> 74aad4ee3e02
Step 5/14 : COPY . .
 ---> 88617131ee53
Step 6/14 : ENV PORT=8080
 ---> Running in def88742b3a7
Removing intermediate container def88742b3a7
 ---> 1621e11c79ec
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in cf5ec3d69ab1
Removing intermediate container cf5ec3d69ab1
 ---> 999664a79d38
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in e63da6c61064
Removing intermediate container e63da6c61064
 ---> c2c33a1a8920
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6cf451255d44
Removing intermediate container 6cf451255d44
 ---> a681a19517b2
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2d3905d1f945
Removing intermediate container 2d3905d1f945
 ---> e658983db08e
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 83a4f4b86d3d
Removing intermediate container 83a4f4b86d3d
 ---> df50e89b8ac3
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f3d0086ed8b8
Removing intermediate container f3d0086ed8b8
 ---> f4a262ee726e
Step 13/14 : EXPOSE 8080
 ---> Running in 9d466b55af2c
Removing intermediate container 9d466b55af2c
 ---> f719058bc2ab
Step 14/14 : CMD ["npm","start"]
 ---> Running in a6be0eb266ea
Removing intermediate container a6be0eb266ea
 ---> 9a47cbaa68c6
Successfully built 9a47cbaa68c6
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
14c1d6918427: Preparing
0fa9d01f18c3: Preparing
edbe8bb0e525: Preparing
a560e1915a8d: Preparing
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
8ee6722b9ed5: Layer already exists
a560e1915a8d: Pushed
edbe8bb0e525: Pushed
aca836066730: Layer already exists
14c1d6918427: Pushed
0fa9d01f18c3: Pushed
latest: digest: sha256:48f9af53f317b4d1166a10d1552af1e1b59d9c4d6447ede0317326c43d5e478e size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
8c6cf20d-82de-4ac3-a15a-1f2275e05ecf  2025-10-12T20:24:11+00:00  1M28S     gs://cleanpro-site_cloudbuild/source/1760300625.184506-97eff9107120487f857b754f785f9818.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision......................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00522-7jn' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00522-7jn&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00522-7jn%22 
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
