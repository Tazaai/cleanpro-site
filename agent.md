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

up to date, audited 272 packages in 767ms

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
[32m✓ built in 2.03s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760194755.232606-938e50577cde4f78a30e52f489a66168.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/aad8db94-5952-4d11-a470-89ff4d4a2d8b].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/aad8db94-5952-4d11-a470-89ff4d4a2d8b?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "aad8db94-5952-4d11-a470-89ff4d4a2d8b"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760194755.232606-938e50577cde4f78a30e52f489a66168.tgz#1760194774556983
Copying gs://cleanpro-site_cloudbuild/source/1760194755.232606-938e50577cde4f78a30e52f489a66168.tgz#1760194774556983...
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
 ---> Running in e681de81bd49
Removing intermediate container e681de81bd49
 ---> 3f8fd07ac282
Step 3/14 : COPY package*.json ./
 ---> 10271ec7e970
Step 4/14 : RUN npm install --production
 ---> Running in bbf2c0175fff
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
[0mRemoving intermediate container bbf2c0175fff
 ---> 9095988f1c7e
Step 5/14 : COPY . .
 ---> 2bd00ae6bdcf
Step 6/14 : ENV PORT=8080
 ---> Running in a79750f24120
Removing intermediate container a79750f24120
 ---> 37c032ce992b
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0181b95874f5
Removing intermediate container 0181b95874f5
 ---> 3b784fa32dc7
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 997b720c3be9
Removing intermediate container 997b720c3be9
 ---> 5d1c5988025e
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in a8b5ad4acfd6
Removing intermediate container a8b5ad4acfd6
 ---> 1106f6cc66a4
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in e7a18e074358
Removing intermediate container e7a18e074358
 ---> 2671e4806be9
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 18e7de539b1d
Removing intermediate container 18e7de539b1d
 ---> de5333209868
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b4cdd4175082
Removing intermediate container b4cdd4175082
 ---> cc87fd10e500
Step 13/14 : EXPOSE 8080
 ---> Running in fb80bf447e7c
Removing intermediate container fb80bf447e7c
 ---> 9500c669bba3
Step 14/14 : CMD ["npm","start"]
 ---> Running in 2502dc34271d
Removing intermediate container 2502dc34271d
 ---> 187a4d4cb935
Successfully built 187a4d4cb935
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
2aa3ac264eeb: Preparing
4a418c0ca9a4: Preparing
2f3cd7b9d51a: Preparing
47deea451b11: Preparing
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
2f3cd7b9d51a: Pushed
8ee6722b9ed5: Layer already exists
47deea451b11: Pushed
aca836066730: Layer already exists
2aa3ac264eeb: Pushed
4a418c0ca9a4: Pushed
latest: digest: sha256:a2a4f67a84ad7ee9892fc9dbadab94e2cb93e8f3d43779e3f38f55809a112c3c size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
aad8db94-5952-4d11-a470-89ff4d4a2d8b  2025-10-11T14:59:34+00:00  59S       gs://cleanpro-site_cloudbuild/source/1760194755.232606-938e50577cde4f78a30e52f489a66168.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...........................done
Creating Revision............................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00425-cjh' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00425-cjh&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00425-cjh%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760194863.42655-69e4d0a7f21d4f3ab8896b69bebe6f2c.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/492dac66-2b71-460b-ac00-c153260fc360].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/492dac66-2b71-460b-ac00-c153260fc360?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "492dac66-2b71-460b-ac00-c153260fc360"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760194863.42655-69e4d0a7f21d4f3ab8896b69bebe6f2c.tgz#1760194882034532
Copying gs://cleanpro-site_cloudbuild/source/1760194863.42655-69e4d0a7f21d4f3ab8896b69bebe6f2c.tgz#1760194882034532...
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
 ---> Running in 7a70170b19cd
Removing intermediate container 7a70170b19cd
 ---> 833c5d113a72
Step 3/14 : COPY package*.json ./
 ---> 1ef64c533f40
Step 4/14 : RUN npm install --production
 ---> Running in 5c792136ceee
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
[0mRemoving intermediate container 5c792136ceee
 ---> 739d758e943d
Step 5/14 : COPY . .
 ---> 020edcebc663
Step 6/14 : ENV PORT=8080
 ---> Running in 2dbb6e5f3461
Removing intermediate container 2dbb6e5f3461
 ---> 01977916131c
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9b710cf97b4e
Removing intermediate container 9b710cf97b4e
 ---> 7ce367e0a549
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in c5789a81aede
Removing intermediate container c5789a81aede
 ---> 9c8019062fa8
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f2083383505c
Removing intermediate container f2083383505c
 ---> 2276eeb60366
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 40a46d968630
Removing intermediate container 40a46d968630
 ---> 60ebd94aa03b
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in e691df413079
Removing intermediate container e691df413079
 ---> 826537f4cd59
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 47b1c94e380c
Removing intermediate container 47b1c94e380c
 ---> 6587790c99f0
Step 13/14 : EXPOSE 8080
 ---> Running in 137f29330025
Removing intermediate container 137f29330025
 ---> 9b478dd6eae9
Step 14/14 : CMD ["npm","start"]
 ---> Running in 9d4897dd47f2
Removing intermediate container 9d4897dd47f2
 ---> a7c1b1f6cb88
Successfully built a7c1b1f6cb88
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
bc075c3a1f95: Preparing
51652d626a8f: Preparing
b5d3712c4d16: Preparing
25a9a3c040bf: Preparing
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
b5d3712c4d16: Pushed
25a9a3c040bf: Pushed
7ace34a4ad78: Layer already exists
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
bc075c3a1f95: Pushed
51652d626a8f: Pushed
latest: digest: sha256:6d2a75cdd9e4178c8dad1c5850082c9a4438898e377fbf280000cb71a1783fee size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                      IMAGES                                           STATUS
492dac66-2b71-460b-ac00-c153260fc360  2025-10-11T15:01:22+00:00  55S       gs://cleanpro-site_cloudbuild/source/1760194863.42655-69e4d0a7f21d4f3ab8896b69bebe6f2c.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision.......................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00426-wfb' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00426-wfb&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00426-wfb%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760194971.442414-8548a93c3ebf43de88888ee8920aca77.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/f6e92e99-45c8-48d3-9fd5-5c0ede7e9555].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/f6e92e99-45c8-48d3-9fd5-5c0ede7e9555?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "f6e92e99-45c8-48d3-9fd5-5c0ede7e9555"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760194971.442414-8548a93c3ebf43de88888ee8920aca77.tgz#1760194990169815
Copying gs://cleanpro-site_cloudbuild/source/1760194971.442414-8548a93c3ebf43de88888ee8920aca77.tgz#1760194990169815...
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
cc663995c53d: Waiting
997b350cffa1: Waiting
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
 ---> Running in bdcc8794ff96
Removing intermediate container bdcc8794ff96
 ---> 85941120d604
Step 3/14 : COPY package*.json ./
 ---> 49114e8b91c9
Step 4/14 : RUN npm install --production
 ---> Running in b2e620e48d34
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 5s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container b2e620e48d34
 ---> 97be67373ed9
Step 5/14 : COPY . .
 ---> aee0c40cfd11
Step 6/14 : ENV PORT=8080
 ---> Running in 8aa8f0fcd8f2
Removing intermediate container 8aa8f0fcd8f2
 ---> 057ede89074a
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f30dea8c2871
Removing intermediate container f30dea8c2871
 ---> fb66d348e705
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in d8b5b90c0aeb
Removing intermediate container d8b5b90c0aeb
 ---> 1015f47a212c
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 746f006c281f
Removing intermediate container 746f006c281f
 ---> ad0a2526b94d
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 4e5ec6e17938
Removing intermediate container 4e5ec6e17938
 ---> 298a25f36175
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in e5dea1f4c84e
Removing intermediate container e5dea1f4c84e
 ---> 709c948aad03
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b784ec48da62
Removing intermediate container b784ec48da62
 ---> ad1b92409c13
Step 13/14 : EXPOSE 8080
 ---> Running in 9076d4bbc0b4
Removing intermediate container 9076d4bbc0b4
 ---> baa26b72d0fb
Step 14/14 : CMD ["npm","start"]
 ---> Running in 4f66726863c2
Removing intermediate container 4f66726863c2
 ---> d2e2dea7189f
Successfully built d2e2dea7189f
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
647a2d108c08: Preparing
deccd378cc3b: Preparing
5cae6594d6fc: Preparing
829e4c7385c6: Preparing
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
829e4c7385c6: Pushed
8ee6722b9ed5: Layer already exists
5cae6594d6fc: Pushed
aca836066730: Layer already exists
647a2d108c08: Pushed
deccd378cc3b: Pushed
latest: digest: sha256:0c63597637bbdb7420935bbcb8e0dd25d5864f46e1fd7da15c62c2d44ef09587 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
f6e92e99-45c8-48d3-9fd5-5c0ede7e9555  2025-10-11T15:03:10+00:00  43S       gs://cleanpro-site_cloudbuild/source/1760194971.442414-8548a93c3ebf43de88888ee8920aca77.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00427-gfd' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00427-gfd&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00427-gfd%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 3 failed — reading Cloud Run logs...
──────────────────────────────
📋 Codox AI Master completed
Timestamp: 2025-10-11 15:04:26
✅ Full backend, frontend, DB, deploy cycle done.
✅ review_report.sh syntax verified
──────────────────────────────
🏁 End of review_report.sh (Codox Master Controller)
───────────────────────────
📊 End of Summary (auto-generated)
