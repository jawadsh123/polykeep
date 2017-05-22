/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","cb0864e87c9ec99218844c29b1221a7f"],["/bower_components/app-layout/app-drawer/app-drawer.html","c874de591ddaf27c302378d0cf7e1e27"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","6901fbc31ce398b1eb08b0465b505431"],["/bower_components/app-layout/app-header/app-header.html","2cd5d5d7c9bdabc63ac870d0b1ae8610"],["/bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","ca3d2d7e1780a98f78eee3b1519e696e"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","b50a6011f9cb492c9e2a83d2f8955399"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","cb65065f730d76538be3d15794650adf"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","d7fe94ca7c381f0d814ae8f03e7a1707"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","93d85d4f6d42fd57d73fda270f8b8b5d"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","cb919252b3b9eb1c7d57fc7022353c9a"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","e1917db70703c8af036b1a29fd7d6237"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","91cbbf08e10ad1d60804d5403f10b679"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","1969068eeac3ed606025f04bf7871282"],["/bower_components/app-layout/helpers/helpers.html","1da38888481edb36a5d7f15a8633dd9f"],["/bower_components/app-route/app-location.html","77bdb903ec70eece5e41c911c355d0cf"],["/bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["/bower_components/app-route/app-route.html","bee92f77d4503b43a33d1761a33936d7"],["/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror-client.html","2d172ba045e7d9b9fe27308cb2bf7417"],["/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html","bf44841abb63ad2337bfb245b901acb8"],["/bower_components/app-storage/app-indexeddb-mirror/common-worker.html","966ec8a5d7df441e187672e513c34471"],["/bower_components/app-storage/app-localstorage/app-localstorage-document.html","b7f3e383846eb11d02215a3d463e7f6a"],["/bower_components/app-storage/app-network-status-behavior.html","974bc78cfcc967de98b5d7b54826d079"],["/bower_components/app-storage/app-storage-behavior.html","50424b44ed5f5b55a9de73a4ac768970"],["/bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","6cf38a185639dee8370ebca7982337d6"],["/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","f226902b75093c63a564b691039ee77b"],["/bower_components/iron-behaviors/iron-button-state.html","46729593dbd37c5c789abe06a84a3c3c"],["/bower_components/iron-behaviors/iron-control-state.html","f1329af310a186a0c3ce264937c34c5e"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","dfdc7f12b3a37df3b4157f90e90d1218"],["/bower_components/iron-flex-layout/iron-flex-layout-classes.html","7fdc2ab3c7921949621e8374a86e2af4"],["/bower_components/iron-flex-layout/iron-flex-layout.html","3e285c2698feec264710fffd609630ad"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","2f0a609a52c3b90dc78d529858f04445"],["/bower_components/iron-icon/iron-icon.html","0d81dc84af38dfdaa7eca375ab7a9b9e"],["/bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","856c951561d9f77e9f307080f926b2ad"],["/bower_components/iron-image/iron-image.html","adb4ff0596628d324debd2fd732c6820"],["/bower_components/iron-input/iron-input.html","43ca22a55b95d37f6025a31835fd5137"],["/bower_components/iron-list/iron-list.html","d9c03710ac4b03fdbf9251892863866f"],["/bower_components/iron-location/iron-location.html","c0e571b804028a1f1f76a5caa7a63ee6"],["/bower_components/iron-location/iron-query-params.html","41964ce091583f5f99f9e257dbb86fb2"],["/bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["/bower_components/iron-meta/iron-meta.html","8b63ecf8a80ec25f3890f7377f9b263c"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","a55e602c014791189a4dfa7bca7672e6"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","b48170aa9276dbdc4a0bc76c3bb65cfe"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","f26220a963d521e81d8ea90bd8e25dde"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","0fea9b9f299c61c4597fb5cb9e3540c7"],["/bower_components/iron-pages/iron-pages.html","aeb0aff1b1109fc353d8b7af89792220"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","bd6b3ae43d5cc2424e5bf8ba0d31b91b"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","9971205eaf94e97c3a987be2d4e50e52"],["/bower_components/iron-selector/iron-multi-selectable.html","196a7c658213a28e6924e9152628b50c"],["/bower_components/iron-selector/iron-selectable.html","463a466542da2a1c12b555953c7e7df1"],["/bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["/bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","15574530462b9f0c2ae512b078c596a2"],["/bower_components/mutation-observer-behavior/mutation-observer-behavior.html","e96afdaf3ecc33f46ec3e0d7be9650a8"],["/bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","360acdba9e68fb7bf5c2be15f3fc5845"],["/bower_components/paper-button/paper-button.html","e56a59ed88bb90e19df8338c53e984a5"],["/bower_components/paper-card/paper-card.html","86feddb1aa52e5c01a980bd1c0ecc613"],["/bower_components/paper-fab/paper-fab.html","d2179fce15722c8defad314178fb03d7"],["/bower_components/paper-icon-button/paper-icon-button.html","419e5af09e5a1ecfe47a7f1e431c3842"],["/bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["/bower_components/paper-input/paper-input-behavior.html","6f945cf4c6d08a442b6b80746f0c27b8"],["/bower_components/paper-input/paper-input-char-counter.html","3cd45d4dbda33d1d0fc8252be47fc1ed"],["/bower_components/paper-input/paper-input-container.html","31accb52aa1f9c45c1f34e123bbce16a"],["/bower_components/paper-input/paper-input-error.html","19103517e283f3c553437b1b82a5bcd2"],["/bower_components/paper-input/paper-input.html","2e3414228ff69c4ebc6691b408e290c4"],["/bower_components/paper-input/paper-textarea.html","c594834b8ca9f60fe130ed798eec0fa2"],["/bower_components/paper-material/paper-material-shared-styles.html","0880145bd868df7784d5cd49963468f6"],["/bower_components/paper-material/paper-material.html","93846e9b646f5acc9e8e8c45eebb9031"],["/bower_components/paper-ripple/paper-ripple.html","1d834ff9b0eda8db7321c05ac8a6c1f1"],["/bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["/bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["/bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["/bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["/bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["/bower_components/paper-toast/paper-toast.html","2683d885fad9eec119426570f8f2276f"],["/bower_components/polymer/lib/elements/array-selector.html","7618aaa704e73edac157cee421c17a0a"],["/bower_components/polymer/lib/elements/custom-style.html","1fe93e63fc91760b8df9362e7812317c"],["/bower_components/polymer/lib/elements/dom-bind.html","39cab02466b779bb63f50ea61300804b"],["/bower_components/polymer/lib/elements/dom-if.html","30db79f1a42aaa74306798d117f70db6"],["/bower_components/polymer/lib/elements/dom-module.html","03d709239d9f30b27a38f6ad51eb3cf0"],["/bower_components/polymer/lib/elements/dom-repeat.html","78f72276051d00d6d246e8811d480c3e"],["/bower_components/polymer/lib/legacy/class.html","305714b06cee743c0ab3b9ef790f573d"],["/bower_components/polymer/lib/legacy/legacy-element-mixin.html","13074f3bfaa45b78e282bc4495651b44"],["/bower_components/polymer/lib/legacy/mutable-data-behavior.html","187499217d653ed9aff4c0da51d4e969"],["/bower_components/polymer/lib/legacy/polymer-fn.html","4ecb6f82dd2003974ec5004dcb5644f0"],["/bower_components/polymer/lib/legacy/polymer.dom.html","0005f6a862578cf790a9056dccd4b571"],["/bower_components/polymer/lib/legacy/templatizer-behavior.html","e0c287b296192f5a97986da66a967806"],["/bower_components/polymer/lib/mixins/element-mixin.html","b745427717600bf208b14c66d69238e1"],["/bower_components/polymer/lib/mixins/gesture-event-listeners.html","8f7381b32a0c6f5aab3d89eb5044c0a8"],["/bower_components/polymer/lib/mixins/mutable-data.html","2ca671488013c7b8b1b5d9f30bf3429c"],["/bower_components/polymer/lib/mixins/property-accessors.html","a0fdb158e2b75c013527b2a8bfde45e9"],["/bower_components/polymer/lib/mixins/property-effects.html","376710a7f1e0d917dfaf43106fc4a555"],["/bower_components/polymer/lib/mixins/template-stamp.html","ef816dc607ef1fccc8a4e909b1ee509e"],["/bower_components/polymer/lib/utils/array-splice.html","39cacec8c29827b7238d2926ccf35eeb"],["/bower_components/polymer/lib/utils/async.html","964f41ccd907d5d57106685d618f8262"],["/bower_components/polymer/lib/utils/boot.html","c6e529cc82ed94f9be8ae1ce71273930"],["/bower_components/polymer/lib/utils/case-map.html","fbcc9191460c40f56274059303f240f5"],["/bower_components/polymer/lib/utils/debounce.html","b82b45dd67d803863875428273dbd278"],["/bower_components/polymer/lib/utils/flattened-nodes-observer.html","e10bc8cb0d1a12559be3202329f96383"],["/bower_components/polymer/lib/utils/flush.html","3f1ae81bfde1d720931126833dcb6c12"],["/bower_components/polymer/lib/utils/gestures.html","16e91b5fe996ac31c34f888025afb705"],["/bower_components/polymer/lib/utils/import-href.html","ab67a53713c709ca6422271643e5c6ef"],["/bower_components/polymer/lib/utils/mixin.html","9f59315d38d7dec796445d0c68ab3bae"],["/bower_components/polymer/lib/utils/path.html","c6c703f031a793a1d013efb629f13f7f"],["/bower_components/polymer/lib/utils/render-status.html","f1d2f69c7dc8114d8daa841c9a85bf70"],["/bower_components/polymer/lib/utils/resolve-url.html","9655e21ed83a0b9c7daab6e150001dda"],["/bower_components/polymer/lib/utils/style-gather.html","9f4cd12fe5270dc69517f18028194cd4"],["/bower_components/polymer/lib/utils/templatize.html","ded99a88d03eb05c9d7ff2d36811722b"],["/bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["/bower_components/polymer/polymer-element.html","7e714c300932fa5c6d7bee1c8da03721"],["/bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["/bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["/bower_components/shadycss/apply-shim.min.js","ceeaad90c0e6d9265c81f0ddf3a6612c"],["/bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["/bower_components/shadycss/custom-style-interface.min.js","c87605744df92a24f8a3faa0776bfd2e"],["/bower_components/swipe-action/swipe-action-new.html","7f650c8f6f6667fe618ed01e15364633"],["/bower_components/webcomponentsjs/custom-elements-es5-adapter.js","e6324a1b9a6f7dbac892a472464088db"],["/bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["/bower_components/webcomponentsjs/webcomponents-hi-ce.js","495de81020abfefd4f0e3dcff6b7fd3e"],["/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","f5ad3a6d039cf11e3a8e0797d7fe7983"],["/bower_components/webcomponentsjs/webcomponents-hi.js","0ac538bae69f6beb629d2357350041e7"],["/bower_components/webcomponentsjs/webcomponents-lite.js","31d41b5b6bb9631dff43c4a61001e742"],["/bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["/bower_components/webcomponentsjs/webcomponents-sd-ce.js","e1ea140854ba25ce094ec0f9d367ed82"],["/index.html","805ad933fa7c67315291be66cc51cd60"],["/manifest.json","f7e042cdeadb4bd72ea836c13ba58a02"],["/src/archive-note-list.html","884e2a17fd269605ce8edb24fd83fd46"],["/src/my-app.html","6806999d6f7d04ca1b741fd822efa6e2"],["/src/my-view404.html","fdd0eee89d114763114d8091e99527cf"],["/src/note-list.html","bbf022cca95bfd7bc082c7ba43772d7c"],["/src/pk-create-note.html","450ee17a7da31595fd05688b9d36ca09"],["/src/pk-editable-note.html","5f6116bdd283f77043a5fa760197dcd3"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







