## 🧭 Reading PROJECT_GUIDE.md context...
✅ Project guide loaded.
## 🔍 Validating base structure...
## 🔑 Checking required secrets...
✅ GOOGLE_MAPS_API_KEY OK
✅ GCP_PROJECT OK
✅ GCP_SA_KEY OK
✅ FIREBASE_KEY OK
## 🔐 Authenticating to Google Cloud...
Activated service account credentials for: [github-deployer@cleanpro-site.iam.gserviceaccount.com]
Updated property [core/account].
WARNING: INVALID_ARGUMENT: Request contains an invalid argument.
Updated property [core/project].
Updated property [run/region].
## 🐳 Verifying Dockerfile...
## 🎨 Checking frontend...

added 344 packages, and audited 345 packages in 17s

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
[32m✓ built in 2.01s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760533975.233117-9dabc6a7cba94c1599e79ba8fd7e4268.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/156c8033-9e05-49d5-a5a1-3a0374c83422].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/156c8033-9e05-49d5-a5a1-3a0374c83422?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "156c8033-9e05-49d5-a5a1-3a0374c83422"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760533975.233117-9dabc6a7cba94c1599e79ba8fd7e4268.tgz#1760533991996804
Copying gs://cleanpro-site_cloudbuild/source/1760533975.233117-9dabc6a7cba94c1599e79ba8fd7e4268.tgz#1760533991996804...
/ [0 files][    0.0 B/ 22.9 MiB]                                                -- [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/17 : FROM node:20
20: Pulling from library/node
c6b11972fd12: Already exists
db3dba6026a3: Already exists
5fb1b35a6fc1: Already exists
d6ecbfb3e7f8: Already exists
b44b21b18714: Pulling fs layer
ae6f95508495: Pulling fs layer
1b7f8e1ff922: Pulling fs layer
eaf2cbadb0df: Pulling fs layer
eaf2cbadb0df: Waiting
b44b21b18714: Verifying Checksum
b44b21b18714: Download complete
1b7f8e1ff922: Verifying Checksum
1b7f8e1ff922: Download complete
b44b21b18714: Pull complete
ae6f95508495: Verifying Checksum
ae6f95508495: Download complete
eaf2cbadb0df: Verifying Checksum
eaf2cbadb0df: Download complete
ae6f95508495: Pull complete
1b7f8e1ff922: Pull complete
eaf2cbadb0df: Pull complete
Digest: sha256:8cdc6b9b711af0711cc6139955cc1331fab5e0a995afd3260c52736fbc338059
Status: Downloaded newer image for node:20
 ---> f6f3cc67eec4
Step 2/17 : WORKDIR /app/backend
 ---> Running in 8daf6a9b43bb
Removing intermediate container 8daf6a9b43bb
 ---> 301b5bbb54ab
Step 3/17 : WORKDIR /app/backend
 ---> Running in ac44590ab125
Removing intermediate container ac44590ab125
 ---> 4068871571cc
Step 4/17 : COPY package*.json ./
 ---> f3918a6dd218
Step 5/17 : RUN npm install --omit=dev
 ---> Running in 366eb5e20cdb
[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
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
[0mRemoving intermediate container 366eb5e20cdb
 ---> 2d8126201434
Step 6/17 : COPY . .
 ---> d926decf34d3
Step 7/17 : ENV PORT=8080
 ---> Running in 68a57e555287
Removing intermediate container 68a57e555287
 ---> d8d990c92b20
Step 8/17 : ENV HOST=0.0.0.0
 ---> Running in 429991af8ffb
Removing intermediate container 429991af8ffb
 ---> 9d4a4f8da7bf
Step 9/17 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in cd0900bad66c
Removing intermediate container cd0900bad66c
 ---> f3ce747ca49e
Step 10/17 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 21ad25a1cea2
Removing intermediate container 21ad25a1cea2
 ---> e360183f39ee
Step 11/17 : EXPOSE 8080
 ---> Running in ff44f52e91fe
Removing intermediate container ff44f52e91fe
 ---> 2f9b5c444664
Step 12/17 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in 80a0716c45ef
Removing intermediate container 80a0716c45ef
 ---> 1385ca6d92f9
Step 13/17 : CMD ["node", "index.js"]
 ---> Running in af4433baa37f
Removing intermediate container af4433baa37f
 ---> 637c56ee201e
Step 14/17 : CMD ["node","index.js"]
 ---> Running in 9b34ffcb30d7
Removing intermediate container 9b34ffcb30d7
 ---> 396aa77f8f1a
Step 15/17 : CMD ["node","index.js"]
 ---> Running in bf270b6e6811
Removing intermediate container bf270b6e6811
 ---> a013e36d462d
Step 16/17 : CMD ["node","index.js"]
 ---> Running in be6899c6372c
Removing intermediate container be6899c6372c
 ---> 958f4d45780f
Step 17/17 : CMD ["node","index.js"]
 ---> Running in 15c191f370cc
Removing intermediate container 15c191f370cc
 ---> 9957c5c74584
Successfully built 9957c5c74584
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
f98c9ebc9d7e: Preparing
c75f132d4b6a: Preparing
b371b960fd65: Preparing
4751cf9e3a43: Preparing
bb9b55128ba0: Preparing
856b4ab3e742: Preparing
69368a71b175: Preparing
316cddb5fa75: Preparing
1bd72b149259: Preparing
060ee1077a8d: Preparing
3f1630e3667f: Preparing
3b385b8d2549: Preparing
856b4ab3e742: Waiting
69368a71b175: Waiting
316cddb5fa75: Waiting
1bd72b149259: Waiting
060ee1077a8d: Waiting
3f1630e3667f: Waiting
3b385b8d2549: Waiting
bb9b55128ba0: Layer already exists
856b4ab3e742: Layer already exists
69368a71b175: Layer already exists
4751cf9e3a43: Pushed
316cddb5fa75: Layer already exists
b371b960fd65: Pushed
1bd72b149259: Layer already exists
3f1630e3667f: Layer already exists
3b385b8d2549: Layer already exists
060ee1077a8d: Layer already exists
f98c9ebc9d7e: Pushed
c75f132d4b6a: Pushed
latest: digest: sha256:f6dd1ed8489288a17ae78aa219b55b14e8df7f3a0787c5742747d2212ba9cfbd size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
156c8033-9e05-49d5-a5a1-3a0374c83422  2025-10-15T13:13:12+00:00  1M50S     gs://cleanpro-site_cloudbuild/source/1760533975.233117-9dabc6a7cba94c1599e79ba8fd7e4268.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision...........................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00612-6cv' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00612-6cv&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00612-6cv%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/13.16.06.638060.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760534166.859308-7191e4fb2b074dea8f3155a2b7d922b1.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/38cbabc5-b017-4705-b856-7626bf1e62b0].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/38cbabc5-b017-4705-b856-7626bf1e62b0?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "38cbabc5-b017-4705-b856-7626bf1e62b0"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760534166.859308-7191e4fb2b074dea8f3155a2b7d922b1.tgz#1760534167285893
Copying gs://cleanpro-site_cloudbuild/source/1760534166.859308-7191e4fb2b074dea8f3155a2b7d922b1.tgz#1760534167285893...
/ [0 files][    0.0 B/163.8 KiB]                                                / [1 files][163.8 KiB/163.8 KiB]                                                
Operation completed over 1 objects/163.8 KiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    340kB
Step 1/11 : FROM node:20-alpine AS build
20-alpine: Pulling from library/node
2d35ebdb57d9: Already exists
c087321cece4: Pulling fs layer
f2fbe8556258: Pulling fs layer
c74c90aa7c87: Pulling fs layer
c74c90aa7c87: Verifying Checksum
c74c90aa7c87: Download complete
f2fbe8556258: Verifying Checksum
f2fbe8556258: Download complete
c087321cece4: Verifying Checksum
c087321cece4: Download complete
c087321cece4: Pull complete
f2fbe8556258: Pull complete
c74c90aa7c87: Pull complete
Digest: sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
Status: Downloaded newer image for node:20-alpine
 ---> 30c8b6e55a5d
Step 2/11 : WORKDIR /app
 ---> Running in 4c670a992bab
Removing intermediate container 4c670a992bab
 ---> a64fdde13bc4
Step 3/11 : COPY package*.json ./
 ---> bdf9cd5aede3
Step 4/11 : RUN npm install
 ---> Running in b84c987c1195

added 346 packages, and audited 347 packages in 27s

47 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container b84c987c1195
 ---> 11e02215bae9
Step 5/11 : COPY . .
 ---> 1dedae2dfe76
Step 6/11 : RUN npm run build
 ---> Running in 03419b3319c2

> cleanpro-frontend@1.0.0 build
> vite build

vite v4.5.14 building for production...
transforming...
✓ 69 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.70 kB │ gzip:  0.40 kB
dist/assets/index-39fedcd9.css   16.10 kB │ gzip:  3.73 kB
dist/assets/index-b4cf7e65.js   201.34 kB │ gzip: 63.48 kB
✓ built in 5.08s
Removing intermediate container 03419b3319c2
 ---> 2b8294469003
Step 7/11 : FROM nginx:alpine
alpine: Pulling from library/nginx
2d35ebdb57d9: Already exists
f80aba050ead: Pulling fs layer
621a51978ed7: Pulling fs layer
03e63548f209: Pulling fs layer
83ce83cd9960: Pulling fs layer
e2d0ea5d3690: Pulling fs layer
7fb80c2f28bc: Pulling fs layer
76c9bcaa4163: Pulling fs layer
e2d0ea5d3690: Waiting
7fb80c2f28bc: Waiting
76c9bcaa4163: Waiting
83ce83cd9960: Waiting
621a51978ed7: Verifying Checksum
621a51978ed7: Download complete
f80aba050ead: Verifying Checksum
f80aba050ead: Download complete
03e63548f209: Verifying Checksum
03e63548f209: Download complete
f80aba050ead: Pull complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
621a51978ed7: Pull complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
e2d0ea5d3690: Verifying Checksum
e2d0ea5d3690: Download complete
03e63548f209: Pull complete
83ce83cd9960: Pull complete
e2d0ea5d3690: Pull complete
7fb80c2f28bc: Pull complete
76c9bcaa4163: Verifying Checksum
76c9bcaa4163: Download complete
76c9bcaa4163: Pull complete
Digest: sha256:61e01287e546aac28a3f56839c136b31f590273f3b41187a36f46f6a03bbfe22
Status: Downloaded newer image for nginx:alpine
 ---> 5e7abcdd2021
Step 8/11 : COPY --from=build /app/dist /usr/share/nginx/html
 ---> afbaded928f4
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> 3a460b6d0778
Step 10/11 : EXPOSE 8080
 ---> Running in d9570cf1b769
Removing intermediate container d9570cf1b769
 ---> 60c88ef23fc6
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in 09a67f4c7542
Removing intermediate container 09a67f4c7542
 ---> 65f76234c3db
Successfully built 65f76234c3db
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
21727be4ffb4: Preparing
6de994fabe0e: Preparing
e9a26559275d: Preparing
1704c5a3d8da: Preparing
dc45ec6c902b: Preparing
3e4655a38876: Preparing
abbef7f88314: Preparing
ed6be5e2fd33: Preparing
1967fccdbe5e: Preparing
256f393e029f: Preparing
3e4655a38876: Waiting
abbef7f88314: Waiting
ed6be5e2fd33: Waiting
1967fccdbe5e: Waiting
256f393e029f: Waiting
e9a26559275d: Layer already exists
dc45ec6c902b: Layer already exists
1704c5a3d8da: Layer already exists
3e4655a38876: Layer already exists
abbef7f88314: Layer already exists
ed6be5e2fd33: Layer already exists
1967fccdbe5e: Layer already exists
256f393e029f: Layer already exists
21727be4ffb4: Pushed
6de994fabe0e: Pushed
latest: digest: sha256:04f62da0f5bbd2436eae484299cd00c5b2d589d69c0fe2fbec4e90672937216d size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
38cbabc5-b017-4705-b856-7626bf1e62b0  2025-10-15T13:16:07+00:00  1M9S      gs://cleanpro-site_cloudbuild/source/1760534166.859308-7191e4fb2b074dea8f3155a2b7d922b1.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy..........................done
Creating Revision.................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00189-qzg] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
[main 4510273] chore(codox): automated review & deploy report
 1 file changed, 143 insertions(+), 142 deletions(-)
To https://github.com/Tazaai/cleanpro-site
   a610a0e..4510273  main -> main
❌ Codox run detected issues — review agent.md
