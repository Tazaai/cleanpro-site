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

added 344 packages, and audited 345 packages in 15s

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
[32m✓ built in 2.05s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760532729.708366-197d64deb5764bc184a730e64134928c.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/e92e12af-6ba9-4ee5-8e9b-0883ff68c6ae].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/e92e12af-6ba9-4ee5-8e9b-0883ff68c6ae?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "e92e12af-6ba9-4ee5-8e9b-0883ff68c6ae"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760532729.708366-197d64deb5764bc184a730e64134928c.tgz#1760532749083858
Copying gs://cleanpro-site_cloudbuild/source/1760532729.708366-197d64deb5764bc184a730e64134928c.tgz#1760532749083858...
/ [0 files][    0.0 B/ 22.9 MiB]                                                -- [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/15 : FROM node:20
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
eaf2cbadb0df: Verifying Checksum
eaf2cbadb0df: Download complete
b44b21b18714: Pull complete
ae6f95508495: Verifying Checksum
ae6f95508495: Download complete
ae6f95508495: Pull complete
1b7f8e1ff922: Pull complete
eaf2cbadb0df: Pull complete
Digest: sha256:8cdc6b9b711af0711cc6139955cc1331fab5e0a995afd3260c52736fbc338059
Status: Downloaded newer image for node:20
 ---> f6f3cc67eec4
Step 2/15 : WORKDIR /app/backend
 ---> Running in 831ae536f6ec
Removing intermediate container 831ae536f6ec
 ---> abee0633001a
Step 3/15 : WORKDIR /app/backend
 ---> Running in 7b7a958902e1
Removing intermediate container 7b7a958902e1
 ---> f4fd5b0fa1b2
Step 4/15 : COPY package*.json ./
 ---> f23b207ac94b
Step 5/15 : RUN npm install --omit=dev
 ---> Running in 44fa7f2fc3ea
[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
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
[0mRemoving intermediate container 44fa7f2fc3ea
 ---> 7ae6099c500b
Step 6/15 : COPY . .
 ---> c5302e9e00a7
Step 7/15 : ENV PORT=8080
 ---> Running in b41dc179aa92
Removing intermediate container b41dc179aa92
 ---> a49555029f7d
Step 8/15 : ENV HOST=0.0.0.0
 ---> Running in ec4ec8c09fed
Removing intermediate container ec4ec8c09fed
 ---> 154d377dddc6
Step 9/15 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b05530493bc8
Removing intermediate container b05530493bc8
 ---> ca20d0cdb9de
Step 10/15 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 07cf9fb6a03d
Removing intermediate container 07cf9fb6a03d
 ---> b8218aa0aae8
Step 11/15 : EXPOSE 8080
 ---> Running in 62dff31003f9
Removing intermediate container 62dff31003f9
 ---> 463c9b20741a
Step 12/15 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in 4ce013ee2166
Removing intermediate container 4ce013ee2166
 ---> 0ae8eb4ce9ef
Step 13/15 : CMD ["node", "index.js"]
 ---> Running in 0ab60d083dab
Removing intermediate container 0ab60d083dab
 ---> 52488bb049fc
Step 14/15 : CMD ["node","index.js"]
 ---> Running in 55a8ba88e8f2
Removing intermediate container 55a8ba88e8f2
 ---> a261e9ecf9ad
Step 15/15 : CMD ["node","index.js"]
 ---> Running in 2e789783834c
Removing intermediate container 2e789783834c
 ---> 9ab1c07eccb7
Successfully built 9ab1c07eccb7
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
f429fca8da56: Preparing
3c8fa4fe5934: Preparing
e6e74845a0ee: Preparing
d208d6ab344f: Preparing
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
316cddb5fa75: Layer already exists
e6e74845a0ee: Pushed
d208d6ab344f: Pushed
1bd72b149259: Layer already exists
3f1630e3667f: Layer already exists
060ee1077a8d: Layer already exists
3b385b8d2549: Layer already exists
f429fca8da56: Pushed
3c8fa4fe5934: Pushed
latest: digest: sha256:a1a65a685d14b273853c73e6b0df28740d51fa49f1fcf9e915f8b365339e95c4 size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
e92e12af-6ba9-4ee5-8e9b-0883ff68c6ae  2025-10-15T12:52:29+00:00  1M56S     gs://cleanpro-site_cloudbuild/source/1760532729.708366-197d64deb5764bc184a730e64134928c.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.................................done
Creating Revision.......................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00610-zkh' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00610-zkh&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00610-zkh%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/12.55.16.329356.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760532916.54677-1c5d9a3359a2463e817506a2637743d3.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/13cb5939-d1c7-4697-843a-ef4961797667].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/13cb5939-d1c7-4697-843a-ef4961797667?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "13cb5939-d1c7-4697-843a-ef4961797667"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760532916.54677-1c5d9a3359a2463e817506a2637743d3.tgz#1760532916944452
Copying gs://cleanpro-site_cloudbuild/source/1760532916.54677-1c5d9a3359a2463e817506a2637743d3.tgz#1760532916944452...
/ [0 files][    0.0 B/163.7 KiB]                                                / [1 files][163.7 KiB/163.7 KiB]                                                
Operation completed over 1 objects/163.7 KiB.
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
 ---> Running in 8814c85dcaa4
Removing intermediate container 8814c85dcaa4
 ---> 90ee2b733274
Step 3/11 : COPY package*.json ./
 ---> 9cb6b374b6d7
Step 4/11 : RUN npm install
 ---> Running in a706d20e5989

added 346 packages, and audited 347 packages in 28s

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
[0mRemoving intermediate container a706d20e5989
 ---> 88cecb40e90d
Step 5/11 : COPY . .
 ---> a8dbdea607d0
Step 6/11 : RUN npm run build
 ---> Running in 4c1a36566dd7

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
✓ built in 4.97s
Removing intermediate container 4c1a36566dd7
 ---> c43252b1542d
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
83ce83cd9960: Waiting
e2d0ea5d3690: Waiting
7fb80c2f28bc: Waiting
76c9bcaa4163: Waiting
03e63548f209: Verifying Checksum
03e63548f209: Download complete
621a51978ed7: Verifying Checksum
621a51978ed7: Download complete
f80aba050ead: Verifying Checksum
f80aba050ead: Download complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
e2d0ea5d3690: Download complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
f80aba050ead: Pull complete
76c9bcaa4163: Verifying Checksum
76c9bcaa4163: Download complete
621a51978ed7: Pull complete
03e63548f209: Pull complete
83ce83cd9960: Pull complete
e2d0ea5d3690: Pull complete
7fb80c2f28bc: Pull complete
76c9bcaa4163: Pull complete
Digest: sha256:61e01287e546aac28a3f56839c136b31f590273f3b41187a36f46f6a03bbfe22
Status: Downloaded newer image for nginx:alpine
 ---> 5e7abcdd2021
Step 8/11 : COPY --from=build /app/dist /usr/share/nginx/html
 ---> c0c95f4cec99
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> df2d72ab657a
Step 10/11 : EXPOSE 8080
 ---> Running in 3f48b8dabf45
Removing intermediate container 3f48b8dabf45
 ---> b84b7cedc198
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in 2146148531aa
Removing intermediate container 2146148531aa
 ---> b53cd11e0dd3
Successfully built b53cd11e0dd3
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
2ab23ea5eac7: Preparing
922c28c44398: Preparing
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
dc45ec6c902b: Layer already exists
e9a26559275d: Layer already exists
1704c5a3d8da: Layer already exists
3e4655a38876: Layer already exists
abbef7f88314: Layer already exists
ed6be5e2fd33: Layer already exists
1967fccdbe5e: Layer already exists
256f393e029f: Layer already exists
922c28c44398: Pushed
2ab23ea5eac7: Pushed
latest: digest: sha256:e9deb454c4be753c3c2f70b1c5e30c24cfc699a76cef5f891f7870c570c954ba size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                      IMAGES                                            STATUS
13cb5939-d1c7-4697-843a-ef4961797667  2025-10-15T12:55:17+00:00  1M6S      gs://cleanpro-site_cloudbuild/source/1760532916.54677-1c5d9a3359a2463e817506a2637743d3.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy................................done
Creating Revision...........................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00187-xj2] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
[main c2f79aa] chore(codox): automated review & deploy report
 1 file changed, 140 insertions(+), 139 deletions(-)
To https://github.com/Tazaai/cleanpro-site
   2070c73..c2f79aa  main -> main
❌ Codox run detected issues — review agent.md
