import { useEffect, useState } from 'react';
import Myspinner from '../../share/myspinner.component';
import { DocumentIndex } from './DocumentIndex';
import { useHistory, useLocation } from 'react-router-dom';
import { getPdf } from '../../../services/document-http.service';
import * as PropTypes from 'prop-types';

const downloadPdf = async (client_id, id, fileName) => {
  try {
    const { data } = await getPdf(client_id, id);
    const url = window.URL.createObjectURL(
      new Blob([data]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  } catch (e) {
    console.error(e);
  }
};

const DocumentIndexContainer = ({
  client_id,
  onFetch,
  route,
  tableHeaders,
}) => {
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);
  const history = useHistory();
  const [loaded, setLoaded] = useState(true);
  const [sendId, setSendId] = useState('');
  const [sendClientId, setSendClientId] = useState('');
  const [isOpenedDialog, setIsOpenedDialog] = useState(
    false,
  );

  const [documents, setDocuments] = useState({
    data: [],
    pages: 1,
  });

  const search = query.get('search') || '';
  const id = query.get('id') || '';
  const page = query.get('page') || 1;
  const sort = query.get('sort') || 'created_at';
  const order = query.get('order') || 'desc';

  const fetchDocuments = async () => {
    setLoaded(false);
    try {
      const {
        data: {
          documents,
          meta: { total_pages },
        },
      } = await onFetch(
        client_id,
        page,
        sort,
        order,
        search,
        id,
      );
      setDocuments({ data: documents, pages: total_pages });
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(async () => {
    await fetchDocuments();
  }, [page, sort, order, search, id]);

  if (!loaded) {
    return <Myspinner />;
  }

  return (
    <DocumentIndex
      clientId={client_id}
      documents={documents}
      afterCreateDocument={fetchDocuments}
      history={history}
      id={id}
      isOpenedDialog={isOpenedDialog}
      onDownloadPdf={downloadPdf}
      order={order}
      page={page}
      route={route}
      search={search}
      sendClientId={sendClientId}
      setSendClientId={setSendClientId}
      sendId={sendId}
      setIsOpenedDialog={setIsOpenedDialog}
      setSendId={setSendId}
      sort={sort}
      tableHeaders={tableHeaders}
    />
  );
};

DocumentIndexContainer.propTypes = {
  client_id: PropTypes.string,
  onFetch: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
      style: PropTypes.object,
      sort: PropTypes.string,
    }),
  ).isRequired,
};

export default DocumentIndexContainer;
