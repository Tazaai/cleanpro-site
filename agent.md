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

up to date, audited 272 packages in 731ms

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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760297454.833704-f160778e2c0849278c92c8d827c557c8.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/c8eaf7ec-bbc1-4801-9e1b-cf3f1eeba2f9].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/c8eaf7ec-bbc1-4801-9e1b-cf3f1eeba2f9?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "c8eaf7ec-bbc1-4801-9e1b-cf3f1eeba2f9"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760297454.833704-f160778e2c0849278c92c8d827c557c8.tgz#1760297481172337
Copying gs://cleanpro-site_cloudbuild/source/1760297454.833704-f160778e2c0849278c92c8d827c557c8.tgz#1760297481172337...
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
 ---> Running in d32c971d5fcc
Removing intermediate container d32c971d5fcc
 ---> d50d4eccc62c
Step 3/14 : COPY package*.json ./
 ---> 6adf1ffe11ba
Step 4/14 : RUN npm install --production
 ---> Running in d1b6f8d1d751
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
[0mRemoving intermediate container d1b6f8d1d751
 ---> accb867dafa8
Step 5/14 : COPY . .
 ---> 819aae658a0a
Step 6/14 : ENV PORT=8080
 ---> Running in 2074c17482e8
Removing intermediate container 2074c17482e8
 ---> 53ad6f83fca5
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ef3a5dad3071
Removing intermediate container ef3a5dad3071
 ---> d915bda47cff
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 16f946058987
Removing intermediate container 16f946058987
 ---> f6e9013e33ee
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 8418745026a9
Removing intermediate container 8418745026a9
 ---> a05316159270
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in cc4932742c85
Removing intermediate container cc4932742c85
 ---> a984de4ce425
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 0dfb7d279552
Removing intermediate container 0dfb7d279552
 ---> 507647fb1ff2
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in e9ce2b1e6416
Removing intermediate container e9ce2b1e6416
 ---> 3906d4a4e6c7
Step 13/14 : EXPOSE 8080
 ---> Running in cd4e7781667a
Removing intermediate container cd4e7781667a
 ---> a72a702123a9
Step 14/14 : CMD ["npm","start"]
 ---> Running in 0dc415e94543
Removing intermediate container 0dc415e94543
 ---> 68f8b07a29cb
Successfully built 68f8b07a29cb
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
afe7a45a5268: Preparing
3fe357f4da90: Preparing
6d7538c3a398: Preparing
4eafa6bb5df1: Preparing
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
6d7538c3a398: Pushed
4eafa6bb5df1: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
afe7a45a5268: Pushed
3fe357f4da90: Pushed
latest: digest: sha256:42bd38ca3dcb63f94f072291ed4b5a42e7cf0eaa8987d41124f6e97d790b4aad size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
c8eaf7ec-bbc1-4801-9e1b-cf3f1eeba2f9  2025-10-12T19:31:21+00:00  1M57S     gs://cleanpro-site_cloudbuild/source/1760297454.833704-f160778e2c0849278c92c8d827c557c8.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy..........................done
Creating Revision..............................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00512-4cr' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00512-4cr&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00512-4cr%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760297651.388622-7a85d6ad122b4a14b85645d29cb2b2b4.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/13322830-51bf-4aba-bcb5-f9fe6247a5fd].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/13322830-51bf-4aba-bcb5-f9fe6247a5fd?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "13322830-51bf-4aba-bcb5-f9fe6247a5fd"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760297651.388622-7a85d6ad122b4a14b85645d29cb2b2b4.tgz#1760297677920055
Copying gs://cleanpro-site_cloudbuild/source/1760297651.388622-7a85d6ad122b4a14b85645d29cb2b2b4.tgz#1760297677920055...
/ [0 files][    0.0 B/ 29.3 MiB]                                                -- [1 files][ 29.3 MiB/ 29.3 MiB]                                                
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
 ---> Running in e48bf6661eed
Removing intermediate container e48bf6661eed
 ---> 6e9c41af825b
Step 3/14 : COPY package*.json ./
 ---> 49ff636a2c86
Step 4/14 : RUN npm install --production
 ---> Running in d0b8de3130b7
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
[0mRemoving intermediate container d0b8de3130b7
 ---> be155df5605e
Step 5/14 : COPY . .
 ---> a7ed65e33f9c
Step 6/14 : ENV PORT=8080
 ---> Running in f8426d3336b1
Removing intermediate container f8426d3336b1
 ---> 330244bf9470
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9f327fcc8708
Removing intermediate container 9f327fcc8708
 ---> 8949b483a9cf
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in c92619ba9200
Removing intermediate container c92619ba9200
 ---> 6649bc4560b8
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 26ff3fa4d174
Removing intermediate container 26ff3fa4d174
 ---> f549b780268d
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 3d851023b11d
Removing intermediate container 3d851023b11d
 ---> 20059b8762ee
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 1ee817d97b86
Removing intermediate container 1ee817d97b86
 ---> b26f6f3fb5a9
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ff3108dd409f
Removing intermediate container ff3108dd409f
 ---> e1ab4d55fe66
Step 13/14 : EXPOSE 8080
 ---> Running in 7802e77360d5
Removing intermediate container 7802e77360d5
 ---> f5542de4a855
Step 14/14 : CMD ["npm","start"]
 ---> Running in cb04c5500746
Removing intermediate container cb04c5500746
 ---> afbc985a2006
Successfully built afbc985a2006
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
6f5f13429e51: Preparing
7ac8587009c3: Preparing
5027e24776c0: Preparing
f0f136eb7f49: Preparing
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
f0f136eb7f49: Pushed
5027e24776c0: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
6f5f13429e51: Pushed
7ac8587009c3: Pushed
latest: digest: sha256:a564fc8a5edca6629f0b10e2918332536435a20b5b55f8fc3de0a9c30394afb5 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
13322830-51bf-4aba-bcb5-f9fe6247a5fd  2025-10-12T19:34:38+00:00  2M9S      gs://cleanpro-site_cloudbuild/source/1760297651.388622-7a85d6ad122b4a14b85645d29cb2b2b4.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.....................done
Creating Revision..........................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00513-98f' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00513-98f&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00513-98f%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760297858.929644-3fbe3eb3a54d4c469f828cc543705196.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/4ca2c671-1722-496e-ad90-5a5fecc7f569].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/4ca2c671-1722-496e-ad90-5a5fecc7f569?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "4ca2c671-1722-496e-ad90-5a5fecc7f569"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760297858.929644-3fbe3eb3a54d4c469f828cc543705196.tgz#1760297885156558
Copying gs://cleanpro-site_cloudbuild/source/1760297858.929644-3fbe3eb3a54d4c469f828cc543705196.tgz#1760297885156558...
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
cc663995c53d: Waiting
997b350cffa1: Waiting
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
 ---> Running in 779e227be6c1
Removing intermediate container 779e227be6c1
 ---> 8d965033ea97
Step 3/14 : COPY package*.json ./
 ---> a44000ec9981
Step 4/14 : RUN npm install --production
 ---> Running in 6642f9e456cb
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 14s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 6642f9e456cb
 ---> 942ec5819543
Step 5/14 : COPY . .
 ---> 2829227563e7
Step 6/14 : ENV PORT=8080
 ---> Running in 50a2a86167b3
Removing intermediate container 50a2a86167b3
 ---> 4f53e45cbd67
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 446e4fa1e0a0
Removing intermediate container 446e4fa1e0a0
 ---> d89b6f60f452
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in a7d0e91bc91d
Removing intermediate container a7d0e91bc91d
 ---> 18419e9819ef
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 8b8baef934b6
Removing intermediate container 8b8baef934b6
 ---> 27f5d05f4326
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in c8d6e142e04a
Removing intermediate container c8d6e142e04a
 ---> 7861b68e32e6
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 89e3707a2cfc
Removing intermediate container 89e3707a2cfc
 ---> c418120bb39d
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 5a7d03db35a5
Removing intermediate container 5a7d03db35a5
 ---> edf1a61b4c0a
Step 13/14 : EXPOSE 8080
 ---> Running in 493b4583210a
Removing intermediate container 493b4583210a
 ---> fbb04cb86144
Step 14/14 : CMD ["npm","start"]
 ---> Running in 2f4c429d9ee8
Removing intermediate container 2f4c429d9ee8
 ---> 627e547651ab
Successfully built 627e547651ab
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
8bb821fe4155: Preparing
d4d42f7ffd4d: Preparing
857b26cbe4b2: Preparing
09402d44cd47: Preparing
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
857b26cbe4b2: Pushed
8ee6722b9ed5: Layer already exists
09402d44cd47: Pushed
aca836066730: Layer already exists
8bb821fe4155: Pushed
d4d42f7ffd4d: Pushed
latest: digest: sha256:654be3b51ac9bb6eb3f3a7e4e57fa58aff5bb05a7d56d05c66ef35d328f77e0c size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
4ca2c671-1722-496e-ad90-5a5fecc7f569  2025-10-12T19:38:05+00:00  1M27S     gs://cleanpro-site_cloudbuild/source/1760297858.929644-3fbe3eb3a54d4c469f828cc543705196.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision.............................................................................................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00514-fg6' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00514-fg6&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00514-fg6%22 
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
