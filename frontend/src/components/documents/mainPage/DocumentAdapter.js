import DocumentIndexContainer from './DocumentIndex.container';
import { headers } from './headers';
import { headersWithClient } from './headersWithClient';
import { breadcrumbsDocumentsIndex } from './breadcrumbsDocumentIndex';
import { useDispatch } from 'react-redux';
import {
  getClientDocuments,
  getDocuments,
} from '../../../services/document-http.service';
import { LIMIT } from '../../../constants/tableParams';
import { useEffect } from 'react';
import * as PropTypes from 'prop-types';

const fetchFunction = async (
  client_id,
  page,
  sort,
  order,
  search,
  id,
) => {
  const queryParams = {
    page,
    sort,
    order,
    limit: LIMIT,
    'document_filter[search]': search,
  };
  const filterParams = { id };

  if (client_id) {
    return await getClientDocuments(
      client_id,
      queryParams,
      filterParams,
    );
  }

  return await getDocuments(queryParams, filterParams);
};

const DocumentAdapter = ({ client_id }) => {
  const dispatch = useDispatch();

  const tableHeaders = client_id
    ? headers
    : headersWithClient;

  useEffect(() => {
    breadcrumbsDocumentsIndex(dispatch, '/documents');
  }, []);

  return (
    <DocumentIndexContainer
      client_id={client_id}
      onFetch={fetchFunction}
      route="/documents"
      tableHeaders={tableHeaders}
    />
  );
};

DocumentAdapter.propTypes = {
  client_id: PropTypes.number,
};

export default DocumentAdapter;
