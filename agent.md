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

up to date, audited 272 packages in 761ms

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
[32m✓ built in 1.99s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760197292.175412-6c3315ded18b46068690ab59a79f2b00.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/ef95f4c1-d8ce-4d58-9b84-4c213aad7ec0].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/ef95f4c1-d8ce-4d58-9b84-4c213aad7ec0?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "ef95f4c1-d8ce-4d58-9b84-4c213aad7ec0"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760197292.175412-6c3315ded18b46068690ab59a79f2b00.tgz#1760197311220533
Copying gs://cleanpro-site_cloudbuild/source/1760197292.175412-6c3315ded18b46068690ab59a79f2b00.tgz#1760197311220533...
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
 ---> Running in 155c6bca00d5
Removing intermediate container 155c6bca00d5
 ---> f0c9d273bc5a
Step 3/14 : COPY package*.json ./
 ---> 3b6bc0d7eccc
Step 4/14 : RUN npm install --production
 ---> Running in 9f5762144f55
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
[0mRemoving intermediate container 9f5762144f55
 ---> 3c9f4637d11a
Step 5/14 : COPY . .
 ---> ae5e2c4d522a
Step 6/14 : ENV PORT=8080
 ---> Running in 1c6fd3121337
Removing intermediate container 1c6fd3121337
 ---> b13677434807
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 8de8d1c14b58
Removing intermediate container 8de8d1c14b58
 ---> 1f119267e267
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in bd7a311ac501
Removing intermediate container bd7a311ac501
 ---> 8669a030151f
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b2400fbd9628
Removing intermediate container b2400fbd9628
 ---> 3751c71efb11
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 22204460c1cb
Removing intermediate container 22204460c1cb
 ---> 6d323f7714fa
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 0017ba12728b
Removing intermediate container 0017ba12728b
 ---> 817bbed9211c
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 52bf71fc85e5
Removing intermediate container 52bf71fc85e5
 ---> 439f9bd78c49
Step 13/14 : EXPOSE 8080
 ---> Running in 22f8ec22a8fc
Removing intermediate container 22f8ec22a8fc
 ---> 829d953795f2
Step 14/14 : CMD ["npm","start"]
 ---> Running in ba1abe1a127c
Removing intermediate container ba1abe1a127c
 ---> 8b52c35e1c4a
Successfully built 8b52c35e1c4a
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
137772e6dba9: Preparing
a52b37ca555c: Preparing
8df321b507ae: Preparing
f6af8b25f281: Preparing
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
f6af8b25f281: Pushed
8df321b507ae: Pushed
7ace34a4ad78: Layer already exists
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
137772e6dba9: Pushed
a52b37ca555c: Pushed
latest: digest: sha256:7bbbdc311073a9a8ce16306cf38d3e2830b7cd348d6032954c3ff9ac8db586cb size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
ef95f4c1-d8ce-4d58-9b84-4c213aad7ec0  2025-10-11T15:41:51+00:00  60S       gs://cleanpro-site_cloudbuild/source/1760197292.175412-6c3315ded18b46068690ab59a79f2b00.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.......................done
Creating Revision........................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00433-82s' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00433-82s&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00433-82s%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760197422.984851-d4a53c8414324d058a19fe3aa911bd94.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/62325212-e047-484b-96da-50e586fa5c38].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/62325212-e047-484b-96da-50e586fa5c38?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "62325212-e047-484b-96da-50e586fa5c38"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760197422.984851-d4a53c8414324d058a19fe3aa911bd94.tgz#1760197441265048
Copying gs://cleanpro-site_cloudbuild/source/1760197422.984851-d4a53c8414324d058a19fe3aa911bd94.tgz#1760197441265048...
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
 ---> Running in 393f1bb16235
Removing intermediate container 393f1bb16235
 ---> 4f364c140abc
Step 3/14 : COPY package*.json ./
 ---> c0ebf400130f
Step 4/14 : RUN npm install --production
 ---> Running in ff62409b4508
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
[0mRemoving intermediate container ff62409b4508
 ---> 86c362616837
Step 5/14 : COPY . .
 ---> 9bdebaff99ae
Step 6/14 : ENV PORT=8080
 ---> Running in 54c131b2f9d3
Removing intermediate container 54c131b2f9d3
 ---> f88b1c515952
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in fb3d3afa0e6f
Removing intermediate container fb3d3afa0e6f
 ---> c73ab4337414
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 82f43a90a285
Removing intermediate container 82f43a90a285
 ---> 90b022fee693
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 71fcc2056cda
Removing intermediate container 71fcc2056cda
 ---> 1409b9a67875
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7c04caf6ba6d
Removing intermediate container 7c04caf6ba6d
 ---> 1ad24779cbf5
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ab9fed3ac151
Removing intermediate container ab9fed3ac151
 ---> 146046a85634
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 48f54497add8
Removing intermediate container 48f54497add8
 ---> 7d2867282fc5
Step 13/14 : EXPOSE 8080
 ---> Running in 09a0c7c6b513
Removing intermediate container 09a0c7c6b513
 ---> f66e7b81a13b
Step 14/14 : CMD ["npm","start"]
 ---> Running in 68838254ba5f
Removing intermediate container 68838254ba5f
 ---> 66254b23a50e
Successfully built 66254b23a50e
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
6dc815fc5cda: Preparing
9595ea6275aa: Preparing
3f9feb1865ce: Preparing
83cb65a9e824: Preparing
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
3f9feb1865ce: Pushed
83cb65a9e824: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
6dc815fc5cda: Pushed
9595ea6275aa: Pushed
latest: digest: sha256:91fda2c3402089ec0c4aa2983a3fc772ebe28ee6d32241988c50aa56f8344c81 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
62325212-e047-484b-96da-50e586fa5c38  2025-10-11T15:44:01+00:00  1M2S      gs://cleanpro-site_cloudbuild/source/1760197422.984851-d4a53c8414324d058a19fe3aa911bd94.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision.....................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00434-2p2' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00434-2p2&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00434-2p2%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760197537.493823-7e6e2a0d83a54f519fbcf328506dce1d.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/93286966-d7c4-462e-b9a7-92984d66ac42].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/93286966-d7c4-462e-b9a7-92984d66ac42?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "93286966-d7c4-462e-b9a7-92984d66ac42"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760197537.493823-7e6e2a0d83a54f519fbcf328506dce1d.tgz#1760197556625448
Copying gs://cleanpro-site_cloudbuild/source/1760197537.493823-7e6e2a0d83a54f519fbcf328506dce1d.tgz#1760197556625448...
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
 ---> Running in 50ae0cdd585f
Removing intermediate container 50ae0cdd585f
 ---> 852ee592b8e6
Step 3/14 : COPY package*.json ./
 ---> 388785a027ae
Step 4/14 : RUN npm install --production
 ---> Running in ca923e2000e2
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
[0mRemoving intermediate container ca923e2000e2
 ---> 9cadedfbf137
Step 5/14 : COPY . .
 ---> 426e4514d79b
Step 6/14 : ENV PORT=8080
 ---> Running in 1b0f5801669a
Removing intermediate container 1b0f5801669a
 ---> 0f72bf7d3d0a
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b4af641124f6
Removing intermediate container b4af641124f6
 ---> d1fb6a52aea2
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 4325f5f5784c
Removing intermediate container 4325f5f5784c
 ---> 1b5c78e71381
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in a291adc0bfc1
Removing intermediate container a291adc0bfc1
 ---> d3c0085f7200
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 5cfedba4b4c4
Removing intermediate container 5cfedba4b4c4
 ---> 46b15fb7ce22
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 35c754e4bcda
Removing intermediate container 35c754e4bcda
 ---> 0311446c0a90
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in e68177f08515
Removing intermediate container e68177f08515
 ---> 39fa63db1556
Step 13/14 : EXPOSE 8080
 ---> Running in 3cea860c4569
Removing intermediate container 3cea860c4569
 ---> df9c61e47848
Step 14/14 : CMD ["npm","start"]
 ---> Running in affdb7901619
Removing intermediate container affdb7901619
 ---> 1618533f36ce
Successfully built 1618533f36ce
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
4ebe43aba547: Preparing
9960ec5d03f5: Preparing
8d96fce98fe5: Preparing
8a970e975c37: Preparing
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
8d96fce98fe5: Pushed
8a970e975c37: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
4ebe43aba547: Pushed
9960ec5d03f5: Pushed
latest: digest: sha256:b3888a39d97d087c02bfa36a833ce70de52b21dacc87125230a5e80d954841c1 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
93286966-d7c4-462e-b9a7-92984d66ac42  2025-10-11T15:45:56+00:00  55S       gs://cleanpro-site_cloudbuild/source/1760197537.493823-7e6e2a0d83a54f519fbcf328506dce1d.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.................done
Creating Revision.........................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00435-897' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00435-897&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00435-897%22 
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
