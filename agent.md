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
## 📦 Auto-installing missing backend packages

added 72 packages, and audited 346 packages in 7s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
## 🔥 Firebase Admin init check
## 🎨 Checking frontend API_BASE default
## 🎨 Checking frontend

up to date, audited 272 packages in 750ms

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
[32m✔[39m Repository cloned successfully
run cd fix && pnpm install && pnpm dev
Happy Coding! 💻
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760265383.55855-a41381eaf11547b9b851ff95b40735c0.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/9535d64f-d1bf-43a7-9a33-e41b461124a7].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/9535d64f-d1bf-43a7-9a33-e41b461124a7?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "9535d64f-d1bf-43a7-9a33-e41b461124a7"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760265383.55855-a41381eaf11547b9b851ff95b40735c0.tgz#1760265408493984
Copying gs://cleanpro-site_cloudbuild/source/1760265383.55855-a41381eaf11547b9b851ff95b40735c0.tgz#1760265408493984...
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
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/14 : WORKDIR /app/backend
 ---> Running in d301d81e5026
Removing intermediate container d301d81e5026
 ---> f210c1300cbd
Step 3/14 : COPY package*.json ./
 ---> 4a57b2ea1e72
Step 4/14 : RUN npm install --production
 ---> Running in fd4dc6bb9d4e
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
[0mRemoving intermediate container fd4dc6bb9d4e
 ---> 0062e9dcfe23
Step 5/14 : COPY . .
 ---> 9c2fbceec775
Step 6/14 : ENV PORT=8080
 ---> Running in 04cec1287c15
Removing intermediate container 04cec1287c15
 ---> 94a2550dc937
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 01410816a828
Removing intermediate container 01410816a828
 ---> 9ab5d7933beb
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in edd34fb68ae7
Removing intermediate container edd34fb68ae7
 ---> 0e4fb0c973a8
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in e1377490418a
Removing intermediate container e1377490418a
 ---> 6b431ade1959
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ffbcf35d3359
Removing intermediate container ffbcf35d3359
 ---> 19fccb9b2def
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 4bbc93937dfb
Removing intermediate container 4bbc93937dfb
 ---> 1529e67a6c1e
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9424142e0ae3
Removing intermediate container 9424142e0ae3
 ---> b28ebfc42ca6
Step 13/14 : EXPOSE 8080
 ---> Running in c3568606830b
Removing intermediate container c3568606830b
 ---> 815bdad3e711
Step 14/14 : CMD ["npm","start"]
 ---> Running in 1715e3f5e389
Removing intermediate container 1715e3f5e389
 ---> 0f586fd10914
Successfully built 0f586fd10914
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
557c7414000e: Preparing
97e9bf87b548: Preparing
7d7e0b0e7666: Preparing
8ff83149897e: Preparing
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
8ff83149897e: Pushed
7d7e0b0e7666: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
557c7414000e: Pushed
97e9bf87b548: Pushed
latest: digest: sha256:9d338f8001b198ec6ad9e5158901f4cac7d011dbb4bf22f4e20482ee0ee0e7ee size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                      IMAGES                                           STATUS
9535d64f-d1bf-43a7-9a33-e41b461124a7  2025-10-12T10:36:48+00:00  1M55S     gs://cleanpro-site_cloudbuild/source/1760265383.55855-a41381eaf11547b9b851ff95b40735c0.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision...............................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00485-m6h' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00485-m6h&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00485-m6h%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760265563.852984-8f80ef172e654340a89ae8e8cece5f42.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/aad2924e-8d33-4187-9418-916b86bac1c8].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/aad2924e-8d33-4187-9418-916b86bac1c8?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "aad2924e-8d33-4187-9418-916b86bac1c8"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760265563.852984-8f80ef172e654340a89ae8e8cece5f42.tgz#1760265588611827
Copying gs://cleanpro-site_cloudbuild/source/1760265563.852984-8f80ef172e654340a89ae8e8cece5f42.tgz#1760265588611827...
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
 ---> Running in 5681a6e057e0
Removing intermediate container 5681a6e057e0
 ---> 052e18fa4ba1
Step 3/14 : COPY package*.json ./
 ---> 26c5232e1a50
Step 4/14 : RUN npm install --production
 ---> Running in 973c11fc3049
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 19s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 973c11fc3049
 ---> 8cab4d9cb067
Step 5/14 : COPY . .
 ---> 19bc8d9c5192
Step 6/14 : ENV PORT=8080
 ---> Running in 7666d086d507
Removing intermediate container 7666d086d507
 ---> b4c47a9b5fd4
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f21c6d9603e8
Removing intermediate container f21c6d9603e8
 ---> 699cfcef9d71
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 8f9f0424f9e5
Removing intermediate container 8f9f0424f9e5
 ---> 525598df5df0
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2e60ff7bdbf5
Removing intermediate container 2e60ff7bdbf5
 ---> f050c0b53bc6
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0e85552505e3
Removing intermediate container 0e85552505e3
 ---> 5eea49460cb9
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 3fa76e4b4734
Removing intermediate container 3fa76e4b4734
 ---> 1d64aee5e048
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ea98ad3ffd38
Removing intermediate container ea98ad3ffd38
 ---> 5094c227ae77
Step 13/14 : EXPOSE 8080
 ---> Running in 674a0c3a3c81
Removing intermediate container 674a0c3a3c81
 ---> 9072a44b43dc
Step 14/14 : CMD ["npm","start"]
 ---> Running in 2ee57aab9321
Removing intermediate container 2ee57aab9321
 ---> 162c55b0dd46
Successfully built 162c55b0dd46
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
72efabae672f: Preparing
5417670f890b: Preparing
34109209036e: Preparing
196e010b22cb: Preparing
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
34109209036e: Pushed
196e010b22cb: Pushed
aca836066730: Layer already exists
72efabae672f: Pushed
5417670f890b: Pushed
latest: digest: sha256:3b99d56bd204e44da5608b6c167de88aaf13de3e05b1df7a9e1a61716539c754 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
aad2924e-8d33-4187-9418-916b86bac1c8  2025-10-12T10:39:48+00:00  1M51S     gs://cleanpro-site_cloudbuild/source/1760265563.852984-8f80ef172e654340a89ae8e8cece5f42.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.....................done
Creating Revision.................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00486-b75' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00486-b75&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00486-b75%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760265744.775943-c67f535fe40648309451804b92fe34b4.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/eb6fed29-4ebb-4458-8297-f497db173c1b].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/eb6fed29-4ebb-4458-8297-f497db173c1b?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "eb6fed29-4ebb-4458-8297-f497db173c1b"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760265744.775943-c67f535fe40648309451804b92fe34b4.tgz#1760265770871167
Copying gs://cleanpro-site_cloudbuild/source/1760265744.775943-c67f535fe40648309451804b92fe34b4.tgz#1760265770871167...
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
 ---> Running in b2f7e64acea4
Removing intermediate container b2f7e64acea4
 ---> 6989a20a5da4
Step 3/14 : COPY package*.json ./
 ---> a7e8070ea54c
Step 4/14 : RUN npm install --production
 ---> Running in df39b054d8c9
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
[0mRemoving intermediate container df39b054d8c9
 ---> 0b4d08d4471d
Step 5/14 : COPY . .
 ---> a44244f8d7d5
Step 6/14 : ENV PORT=8080
 ---> Running in a7552f418fc6
Removing intermediate container a7552f418fc6
 ---> 2519afb0aa95
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f9f09615b4fd
Removing intermediate container f9f09615b4fd
 ---> 2678840d62ea
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 6513dc693145
Removing intermediate container 6513dc693145
 ---> 3ce351330f30
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in e7fe8e44c006
Removing intermediate container e7fe8e44c006
 ---> 6782d0bf355b
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 211e9581fa61
Removing intermediate container 211e9581fa61
 ---> 13d0668af8c5
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in b7c73ffc39a1
Removing intermediate container b7c73ffc39a1
 ---> 34a130280bbe
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in e7238b52e269
Removing intermediate container e7238b52e269
 ---> d7a8bf2961fa
Step 13/14 : EXPOSE 8080
 ---> Running in 4393eda1db9a
Removing intermediate container 4393eda1db9a
 ---> 1be7b936c704
Step 14/14 : CMD ["npm","start"]
 ---> Running in 4957ea3470ab
Removing intermediate container 4957ea3470ab
 ---> a98fc9806e52
Successfully built a98fc9806e52
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
95453aec9d33: Preparing
2389ac502c6e: Preparing
2b9619c87bd6: Preparing
3e28ca5a1b9b: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
e07dd166a3a3: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
3e28ca5a1b9b: Pushed
2b9619c87bd6: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
95453aec9d33: Pushed
2389ac502c6e: Pushed
latest: digest: sha256:21b34f5a466eba431998239c4cd37e3375405cbbf2ad893fdf5007e5f05fc490 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
eb6fed29-4ebb-4458-8297-f497db173c1b  2025-10-12T10:42:51+00:00  1M60S     gs://cleanpro-site_cloudbuild/source/1760265744.775943-c67f535fe40648309451804b92fe34b4.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision......................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00487-kdl' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00487-kdl&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00487-kdl%22 
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
