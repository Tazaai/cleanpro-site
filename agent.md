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

up to date, audited 272 packages in 810ms

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
[32m✓ built in 2.20s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760202295.799348-e30256cdebbb4d2fba223064ebfaa510.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/9b5dd33d-ec36-43fb-a3b9-ac4fa8c88028].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/9b5dd33d-ec36-43fb-a3b9-ac4fa8c88028?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "9b5dd33d-ec36-43fb-a3b9-ac4fa8c88028"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760202295.799348-e30256cdebbb4d2fba223064ebfaa510.tgz#1760202314934306
Copying gs://cleanpro-site_cloudbuild/source/1760202295.799348-e30256cdebbb4d2fba223064ebfaa510.tgz#1760202314934306...
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
 ---> Running in 097bc4fcea21
Removing intermediate container 097bc4fcea21
 ---> 96845ef24ec6
Step 3/14 : COPY package*.json ./
 ---> a69c0c2aaa08
Step 4/14 : RUN npm install --production
 ---> Running in 45bad00bca4c
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
[0mRemoving intermediate container 45bad00bca4c
 ---> c81f688a5d64
Step 5/14 : COPY . .
 ---> 7774517c4ff0
Step 6/14 : ENV PORT=8080
 ---> Running in 0f4bab2619b3
Removing intermediate container 0f4bab2619b3
 ---> 7dadd0e4525f
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 4e0ca9b47c14
Removing intermediate container 4e0ca9b47c14
 ---> 3b0ace01e9e5
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 62c297bc243e
Removing intermediate container 62c297bc243e
 ---> 845b2eaee1bb
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b04e584400f6
Removing intermediate container b04e584400f6
 ---> f214cad2bb71
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 182d0fcd05a4
Removing intermediate container 182d0fcd05a4
 ---> 484a1d3aaa6c
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 350d9cd2ddb7
Removing intermediate container 350d9cd2ddb7
 ---> e52e066684b1
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in e5753018fbf7
Removing intermediate container e5753018fbf7
 ---> 2e15d1529abe
Step 13/14 : EXPOSE 8080
 ---> Running in 2cff903d4a7d
Removing intermediate container 2cff903d4a7d
 ---> a0bf13d76c7a
Step 14/14 : CMD ["npm","start"]
 ---> Running in 3c8fc1ac8d45
Removing intermediate container 3c8fc1ac8d45
 ---> 9546fd38c670
Successfully built 9546fd38c670
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
384ae49f4db6: Preparing
99587c10f1f5: Preparing
35b4c1c3f312: Preparing
4045d21685fe: Preparing
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
35b4c1c3f312: Pushed
4045d21685fe: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
384ae49f4db6: Pushed
99587c10f1f5: Pushed
latest: digest: sha256:fa45d2f1fe1c6d36ac2a275e2ec39e54a6b143d2db0bdcff3c161a62b24a4e3b size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
9b5dd33d-ec36-43fb-a3b9-ac4fa8c88028  2025-10-11T17:05:15+00:00  55S       gs://cleanpro-site_cloudbuild/source/1760202295.799348-e30256cdebbb4d2fba223064ebfaa510.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision.................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00441-8l6' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00441-8l6&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00441-8l6%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760202417.378561-a706a0b660864a98aa6376255e96e85d.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/ad73e1c0-952b-4ba3-9bde-85c45a4958e3].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/ad73e1c0-952b-4ba3-9bde-85c45a4958e3?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "ad73e1c0-952b-4ba3-9bde-85c45a4958e3"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760202417.378561-a706a0b660864a98aa6376255e96e85d.tgz#1760202437147672
Copying gs://cleanpro-site_cloudbuild/source/1760202417.378561-a706a0b660864a98aa6376255e96e85d.tgz#1760202437147672...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                -
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
 ---> Running in a23e954406e0
Removing intermediate container a23e954406e0
 ---> ff5cfa60a654
Step 3/14 : COPY package*.json ./
 ---> 8d6727820ea0
Step 4/14 : RUN npm install --production
 ---> Running in 1bb659ae52d8
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
[0mRemoving intermediate container 1bb659ae52d8
 ---> 238bfad92851
Step 5/14 : COPY . .
 ---> 32ef2cac484d
Step 6/14 : ENV PORT=8080
 ---> Running in 3bef603a93f5
Removing intermediate container 3bef603a93f5
 ---> 8b5c3eaaccff
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 8aded4989605
Removing intermediate container 8aded4989605
 ---> 706eaf234ea4
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 7da207b01dfd
Removing intermediate container 7da207b01dfd
 ---> 9eb2f62dd437
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f7bb40955536
Removing intermediate container f7bb40955536
 ---> 26352e44efd5
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9b0de1742ca5
Removing intermediate container 9b0de1742ca5
 ---> 3164eb97d8a3
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in b23509511ea7
Removing intermediate container b23509511ea7
 ---> 9afb2c228439
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 520193ad0f7c
Removing intermediate container 520193ad0f7c
 ---> aee4c56ddaef
Step 13/14 : EXPOSE 8080
 ---> Running in c1ad6d8d74d2
Removing intermediate container c1ad6d8d74d2
 ---> c52fcf2f77dd
Step 14/14 : CMD ["npm","start"]
 ---> Running in 7a53e49170ee
Removing intermediate container 7a53e49170ee
 ---> da45408b7674
Successfully built da45408b7674
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
67152a84e8e3: Preparing
63be64081818: Preparing
8b609efac130: Preparing
b0da7cbb0385: Preparing
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
8b609efac130: Pushed
b0da7cbb0385: Pushed
aca836066730: Layer already exists
67152a84e8e3: Pushed
63be64081818: Pushed
latest: digest: sha256:aeebfd49efa2e75ebda0c229973d83ba4923dac6eb7f56561438aaebf73a5fb6 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
ad73e1c0-952b-4ba3-9bde-85c45a4958e3  2025-10-11T17:07:17+00:00  57S       gs://cleanpro-site_cloudbuild/source/1760202417.378561-a706a0b660864a98aa6376255e96e85d.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy........................done
Creating Revision........................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00442-gpg' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00442-gpg&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00442-gpg%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760202528.625255-0990c8b9dc334ab0bba72a31d87bc62c.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/115fab56-c01e-4c3b-bcaf-5ab6908d9878].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/115fab56-c01e-4c3b-bcaf-5ab6908d9878?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "115fab56-c01e-4c3b-bcaf-5ab6908d9878"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760202528.625255-0990c8b9dc334ab0bba72a31d87bc62c.tgz#1760202548200214
Copying gs://cleanpro-site_cloudbuild/source/1760202528.625255-0990c8b9dc334ab0bba72a31d87bc62c.tgz#1760202548200214...
/ [0 files][    0.0 B/ 22.9 MiB]                                                -- [1 files][ 22.9 MiB/ 22.9 MiB]                                                
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
 ---> Running in c5cdd932faea
Removing intermediate container c5cdd932faea
 ---> f19ec7584cc2
Step 3/14 : COPY package*.json ./
 ---> c0d21846e5c2
Step 4/14 : RUN npm install --production
 ---> Running in d19145d31a6d
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
[0mRemoving intermediate container d19145d31a6d
 ---> 292f2e061923
Step 5/14 : COPY . .
 ---> c765f0ef6e78
Step 6/14 : ENV PORT=8080
 ---> Running in e1b9f4d36e53
Removing intermediate container e1b9f4d36e53
 ---> 358755774ddb
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9a0283dabeef
Removing intermediate container 9a0283dabeef
 ---> b75699d103eb
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 6c67c4d14745
Removing intermediate container 6c67c4d14745
 ---> 36e4df7b9033
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f6d8072bfa6b
Removing intermediate container f6d8072bfa6b
 ---> eff446142658
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ce35bdaa1efd
Removing intermediate container ce35bdaa1efd
 ---> f872cda28aae
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 3e7c39c80edd
Removing intermediate container 3e7c39c80edd
 ---> 09a46f97cd6c
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2a5538177a3f
Removing intermediate container 2a5538177a3f
 ---> 029b59f8ffe8
Step 13/14 : EXPOSE 8080
 ---> Running in e938458679c2
Removing intermediate container e938458679c2
 ---> c0e7a87812f4
Step 14/14 : CMD ["npm","start"]
 ---> Running in 44bc174ea602
Removing intermediate container 44bc174ea602
 ---> 79c9a3eb4988
Successfully built 79c9a3eb4988
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
da610707d57c: Preparing
863ed8ef9c45: Preparing
c15650111642: Preparing
ae666c03df96: Preparing
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
ae666c03df96: Pushed
c15650111642: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
da610707d57c: Pushed
863ed8ef9c45: Pushed
latest: digest: sha256:fcb9b64f87bb3b516c46dd69e45f56f7c77885af7626e337bd82ccb83188d21f size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
115fab56-c01e-4c3b-bcaf-5ab6908d9878  2025-10-11T17:09:08+00:00  59S       gs://cleanpro-site_cloudbuild/source/1760202528.625255-0990c8b9dc334ab0bba72a31d87bc62c.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...........................done
Creating Revision..............................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00443-sq8' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00443-sq8&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00443-sq8%22 
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
