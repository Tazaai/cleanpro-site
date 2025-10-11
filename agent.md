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

up to date, audited 272 packages in 751ms

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
[32m✓ built in 1.94s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760199084.152006-fb04cc87b2674f9886278f4ab7c86ac2.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/99bed3cf-fa49-45a1-9055-96b4579ea81c].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/99bed3cf-fa49-45a1-9055-96b4579ea81c?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "99bed3cf-fa49-45a1-9055-96b4579ea81c"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760199084.152006-fb04cc87b2674f9886278f4ab7c86ac2.tgz#1760199103532420
Copying gs://cleanpro-site_cloudbuild/source/1760199084.152006-fb04cc87b2674f9886278f4ab7c86ac2.tgz#1760199103532420...
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
 ---> Running in c9852f2b9cae
Removing intermediate container c9852f2b9cae
 ---> aad9222515e8
Step 3/14 : COPY package*.json ./
 ---> 8dadb41bf368
Step 4/14 : RUN npm install --production
 ---> Running in ddf5853c769c
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
[0mRemoving intermediate container ddf5853c769c
 ---> ec508c4fe5db
Step 5/14 : COPY . .
 ---> 580c2fd802d3
Step 6/14 : ENV PORT=8080
 ---> Running in 08d33fe99113
Removing intermediate container 08d33fe99113
 ---> ff3d42573c53
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 4ef8d62e800a
Removing intermediate container 4ef8d62e800a
 ---> f33659c42a8d
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ab3a8c4ea3c1
Removing intermediate container ab3a8c4ea3c1
 ---> 4c692727611e
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in adf043fa6fb2
Removing intermediate container adf043fa6fb2
 ---> a0b75b38899c
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f7f2b5ee2dea
Removing intermediate container f7f2b5ee2dea
 ---> 10b7032a3419
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 1a44e80531a1
Removing intermediate container 1a44e80531a1
 ---> d67632f75cb9
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 779e68514d1c
Removing intermediate container 779e68514d1c
 ---> 4801420142b0
Step 13/14 : EXPOSE 8080
 ---> Running in f5ad1775543c
Removing intermediate container f5ad1775543c
 ---> 23922ec6e73b
Step 14/14 : CMD ["npm","start"]
 ---> Running in 32deebad05b2
Removing intermediate container 32deebad05b2
 ---> 714db08fabfe
Successfully built 714db08fabfe
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
66d749d0e5fd: Preparing
406764b1335a: Preparing
ada09e29af83: Preparing
fab20d516657: Preparing
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
fab20d516657: Pushed
ada09e29af83: Pushed
7ace34a4ad78: Layer already exists
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
66d749d0e5fd: Pushed
406764b1335a: Pushed
latest: digest: sha256:a5a833ebcd3849fac3dfe2f51dd082d5a2324b561ba839b463d55694488f842b size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
99bed3cf-fa49-45a1-9055-96b4579ea81c  2025-10-11T16:11:43+00:00  55S       gs://cleanpro-site_cloudbuild/source/1760199084.152006-fb04cc87b2674f9886278f4ab7c86ac2.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy............................done
Creating Revision..................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00437-p7j' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00437-p7j&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00437-p7j%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760199191.268549-cc682df02630471ab9730f6239b1fa9f.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/ce1f4e17-508f-42f6-be2d-5b21d7ff9615].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/ce1f4e17-508f-42f6-be2d-5b21d7ff9615?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "ce1f4e17-508f-42f6-be2d-5b21d7ff9615"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760199191.268549-cc682df02630471ab9730f6239b1fa9f.tgz#1760199209951922
Copying gs://cleanpro-site_cloudbuild/source/1760199191.268549-cc682df02630471ab9730f6239b1fa9f.tgz#1760199209951922...
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
 ---> Running in bffc9cc2ae70
Removing intermediate container bffc9cc2ae70
 ---> a19830eca235
Step 3/14 : COPY package*.json ./
 ---> 8b7a43af8b67
Step 4/14 : RUN npm install --production
 ---> Running in 8683132edc46
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
[0mRemoving intermediate container 8683132edc46
 ---> cdaf4e629fa8
Step 5/14 : COPY . .
 ---> 9ad6c903ad99
Step 6/14 : ENV PORT=8080
 ---> Running in 26c6d5c8e96b
Removing intermediate container 26c6d5c8e96b
 ---> 38a379bbbd28
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9fecd2ac9070
Removing intermediate container 9fecd2ac9070
 ---> 9f738c341063
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 7720242e5396
Removing intermediate container 7720242e5396
 ---> 9a876e48b775
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ec09fbaa46dc
Removing intermediate container ec09fbaa46dc
 ---> 30cde87edc8b
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in af370cdee55a
Removing intermediate container af370cdee55a
 ---> fe8a300e4cc6
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 3270aaf188a9
Removing intermediate container 3270aaf188a9
 ---> de2ee893a012
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 5f08edd379de
Removing intermediate container 5f08edd379de
 ---> 99c3923c13bb
Step 13/14 : EXPOSE 8080
 ---> Running in 071128887fe0
Removing intermediate container 071128887fe0
 ---> 2041ed2553f0
Step 14/14 : CMD ["npm","start"]
 ---> Running in 47f605e57628
Removing intermediate container 47f605e57628
 ---> 01361eb89581
Successfully built 01361eb89581
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
56d12effae67: Preparing
f3a90d05e575: Preparing
a1f8cebfa0de: Preparing
166262cc46b3: Preparing
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
a1f8cebfa0de: Pushed
8ee6722b9ed5: Layer already exists
166262cc46b3: Pushed
aca836066730: Layer already exists
56d12effae67: Pushed
f3a90d05e575: Pushed
latest: digest: sha256:20848ad30f2fb646fc430b67decf5610616eab0a1dc6394e6edf0928a6b9dfce size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
ce1f4e17-508f-42f6-be2d-5b21d7ff9615  2025-10-11T16:13:30+00:00  59S       gs://cleanpro-site_cloudbuild/source/1760199191.268549-cc682df02630471ab9730f6239b1fa9f.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.......................done
Creating Revision................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00438-vlr' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00438-vlr&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00438-vlr%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760199302.706869-ec14f048184b470f9505e0e2123acfdb.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/7772cfa0-99d4-4682-8b75-407163d66c06].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/7772cfa0-99d4-4682-8b75-407163d66c06?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "7772cfa0-99d4-4682-8b75-407163d66c06"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760199302.706869-ec14f048184b470f9505e0e2123acfdb.tgz#1760199321994927
Copying gs://cleanpro-site_cloudbuild/source/1760199302.706869-ec14f048184b470f9505e0e2123acfdb.tgz#1760199321994927...
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
 ---> Running in 9d85239ae0aa
Removing intermediate container 9d85239ae0aa
 ---> af31fd6332b8
Step 3/14 : COPY package*.json ./
 ---> 17d39bc4de1a
Step 4/14 : RUN npm install --production
 ---> Running in adc2d2386467
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
[0mRemoving intermediate container adc2d2386467
 ---> 41dbe7e9b8db
Step 5/14 : COPY . .
 ---> 6b4a6d8be9a6
Step 6/14 : ENV PORT=8080
 ---> Running in b15394f734e6
Removing intermediate container b15394f734e6
 ---> 16d0a432e810
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 98f79efc34cb
Removing intermediate container 98f79efc34cb
 ---> 25c381bebed8
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 69b57d09eac1
Removing intermediate container 69b57d09eac1
 ---> c4c95b039add
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in dfce6adfc971
Removing intermediate container dfce6adfc971
 ---> 9fbc8a148b33
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in dd14d6c4dae7
Removing intermediate container dd14d6c4dae7
 ---> 9b5ba5782e05
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ec49f12ce240
Removing intermediate container ec49f12ce240
 ---> b242ee995062
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in a789ad2ee22e
Removing intermediate container a789ad2ee22e
 ---> 0898a07b3724
Step 13/14 : EXPOSE 8080
 ---> Running in 4eae1a674e38
Removing intermediate container 4eae1a674e38
 ---> 8f5d92a5ec50
Step 14/14 : CMD ["npm","start"]
 ---> Running in e89732863455
Removing intermediate container e89732863455
 ---> cd66afdda53a
Successfully built cd66afdda53a
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
b9be59ae370a: Preparing
2f696eb2ef12: Preparing
357dad7d6aa9: Preparing
b4709f805d27: Preparing
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
357dad7d6aa9: Pushed
b4709f805d27: Pushed
aca836066730: Layer already exists
b9be59ae370a: Pushed
2f696eb2ef12: Pushed
latest: digest: sha256:90abe4274d491f7c42572d79eaa8cbf3b536c0ee5b30723d520a5f13b7e45dc1 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
7772cfa0-99d4-4682-8b75-407163d66c06  2025-10-11T16:15:22+00:00  59S       gs://cleanpro-site_cloudbuild/source/1760199302.706869-ec14f048184b470f9505e0e2123acfdb.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.....................done
Creating Revision..................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00439-c95' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00439-c95&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00439-c95%22 
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
