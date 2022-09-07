import { useState, useEffect } from 'react';
import { getHtml } from '../../services/document-http.service';
import { useParams } from 'react-router-dom';
import Myspinner from '../share/myspinner.component';

export const ShowPdfAsHtml = () => {
  const { client_id, id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [html, setHtml] = useState('');

  const downloadHtmlVersion = async () => {
    try {
      setLoaded(false);
      const {
        data: { data },
      } = await getHtml(client_id, id);
      setHtml(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    downloadHtmlVersion();
  }, []);

  if (!loaded) {
    return <Myspinner />;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};
