import DocumentIndexContainer from '../mainPage/DocumentIndex.container';
import { breadcrumbsDocumentsTab } from './breadcrumbsDocumentsTab';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import { getClient } from '../../../services/client-http.service';
import { headers } from '../mainPage/headers';
import { getClientDocuments } from '../../../services/document-http.service';
import { LIMIT } from '../../../constants/tableParams';
import { useEffect } from 'react';

const DocumentsTab = ({ client_id }) => {
  const dispatch = useDispatch();
  const route = `/clients/show/${client_id}/documents`;

  const fetchClient = async (client_id) => {
    try {
      const {
        data: { client },
      } = await getClient(client_id);
      return client;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const fetchFunction = async (
    client_id,
    page,
    sort,
    order,
    search,
    id,
  ) =>
    await getClientDocuments(
      client_id,
      {
        page: page,
        sort: sort,
        order: order,
        limit: LIMIT,
        'document_filter[search]': search,
      },
      {
        id: id,
      },
    );

  useEffect(async () => {
    breadcrumbsDocumentsTab(
      dispatch,
      '/',
      await fetchClient(client_id),
    );
  }, []);

  return (
    <DocumentIndexContainer
      client_id={client_id}
      route={route}
      tableHeaders={headers}
      onFetch={fetchFunction}
    />
  );
};

DocumentsTab.propTypes = {
  client_id: PropTypes.number.isRequired,
};

export default DocumentsTab;
