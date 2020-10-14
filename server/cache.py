# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os

from flask_caching import Cache

if os.environ.get('FLASK_ENV') == 'staging':
    cache = Cache(
        config={
            'CACHE_TYPE': 'redis',
            'CACHE_REDIS_HOST': '10.67.227.235',
            'CACHE_REDIS_PORT': '6379',
            'CACHE_REDIS_URL': 'redis://10.67.227.235:6379'
        })
elif os.environ.get('FLASK_ENV') == 'production':
    cache = Cache(
        config={
            'CACHE_TYPE': 'redis',
            'CACHE_REDIS_HOST': '10.68.41.20',
            'CACHE_REDIS_PORT': '6379',
            'CACHE_REDIS_URL': 'redis://10.68.41.20:6379'
        })
else:
    cache = Cache(config={'CACHE_TYPE': 'simple'})
