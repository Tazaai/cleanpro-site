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

up to date, audited 345 packages in 769ms

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
[32m✓ built in 1.95s[39m
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
🧠 Attempt 1/1
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760345948.469668-824e8a4af828432b8cd52f0c676a9d04.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/5532cc4a-400e-4e90-8f19-ca2189a46014].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/5532cc4a-400e-4e90-8f19-ca2189a46014?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "5532cc4a-400e-4e90-8f19-ca2189a46014"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760345948.469668-824e8a4af828432b8cd52f0c676a9d04.tgz#1760345973900902
Copying gs://cleanpro-site_cloudbuild/source/1760345948.469668-824e8a4af828432b8cd52f0c676a9d04.tgz#1760345973900902...
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
 ---> Running in e97a8403d7f3
Removing intermediate container e97a8403d7f3
 ---> 9465fa244de3
Step 3/14 : COPY package*.json ./
 ---> ae17a1091189
Step 4/14 : RUN npm install --production
 ---> Running in fcc07e1cad40
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
[0mRemoving intermediate container fcc07e1cad40
 ---> 617e2da4b5f4
Step 5/14 : COPY . .
 ---> b530866b8293
Step 6/14 : ENV PORT=8080
 ---> Running in 7a57b7d43a4f
Removing intermediate container 7a57b7d43a4f
 ---> c3e0a69e772a
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0ff04a6e2f88
Removing intermediate container 0ff04a6e2f88
 ---> 6b3548fe37cb
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 24e2f007d836
Removing intermediate container 24e2f007d836
 ---> f27097bc17d7
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 34a0f60e8498
Removing intermediate container 34a0f60e8498
 ---> e0182e964533
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2e2dc6d8a288
Removing intermediate container 2e2dc6d8a288
 ---> 015fadcffd02
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 6f8eb5950413
Removing intermediate container 6f8eb5950413
 ---> 967315c76354
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 1d8c95cd9330
Removing intermediate container 1d8c95cd9330
 ---> 184f57f76264
Step 13/14 : EXPOSE 8080
 ---> Running in e6cc5652a291
Removing intermediate container e6cc5652a291
 ---> 0784059e82c1
Step 14/14 : CMD ["npm","start"]
 ---> Running in 5f08a3f5fc8e
Removing intermediate container 5f08a3f5fc8e
 ---> 79e65fcc88d7
Successfully built 79e65fcc88d7
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
2cc5eba089a7: Preparing
60451374f1ee: Preparing
8f429428b611: Preparing
f04eed98a2b4: Preparing
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
f04eed98a2b4: Pushed
8ee6722b9ed5: Layer already exists
8f429428b611: Pushed
aca836066730: Layer already exists
2cc5eba089a7: Pushed
60451374f1ee: Pushed
latest: digest: sha256:83e0bc0be622efbbc8a24e3f267a5b8e0a55b57118a5cdada3cdd13d818fc1c5 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
5532cc4a-400e-4e90-8f19-ca2189a46014  2025-10-13T08:59:34+00:00  1M31S     gs://cleanpro-site_cloudbuild/source/1760345948.469668-824e8a4af828432b8cd52f0c676a9d04.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy..............................done
Creating Revision....................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00534-r9n' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00534-r9n&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00534-r9n%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
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
