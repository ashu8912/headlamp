/*
 * Copyright 2025 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Service from '../../../lib/k8s/service';
import { StatusLabel } from '../../common/Label';

export function ServiceGlance({ service }: { service: Service }) {
  const { t } = useTranslation();
  const externalIP = service.getExternalAddresses();

  return (
    <Box display="flex" gap={1} alignItems="center" mt={2} flexWrap="wrap" key="service">
      <StatusLabel status="">
        {t('Type')}: {service.spec.type}
      </StatusLabel>
      <StatusLabel status="">
        {t('glossary|Cluster IP')}: {service.spec.clusterIP}
      </StatusLabel>
      {externalIP && (
        <StatusLabel status="">
          {t('glossary|External IP')}: {externalIP}
        </StatusLabel>
      )}
      {service.spec?.ports?.map(it => (
        <StatusLabel status="" key={it.protocol + it.port}>
          {it.protocol}:{it.port}
        </StatusLabel>
      ))}
    </Box>
  );
}
