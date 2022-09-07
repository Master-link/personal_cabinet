import 'src/components/share/share.style.scss';
import * as PropTypes from 'prop-types';
import DocumentType from '../../../utilities/document-type.utility';
import BeautyMoneyFormat from '../../../utilities/beauty-money-format.utility';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';
import { StyledTableCell } from '../../_helpers/StyledTableCell';
import { StyledTableRow } from '../../_helpers/StyledTableRow';

export const Tr = ({
  client_id,
  client_name,
  clientId,
  creationDatetime,
  crm,
  documentType,
  fileName,
  history,
  id,
  iso4217Code,
  onDownloadPdf,
  onTrClick,
  price,
  serviceCurrencyFmt,
  serviceName,
}) => (
  <StyledTableRow hover>
    <StyledTableCell align="left">{id}</StyledTableCell>

    <StyledTableCell align="left">
      <DocumentType type={documentType} /> ( {serviceName} )
    </StyledTableCell>

    {!clientId && (
      <StyledTableCell align="left">
        <span
          onClick={() =>
            history.push(`/clients/edit/${client_id}`)
          }
        >
          {client_name} ({crm})
        </span>
      </StyledTableCell>
    )}

    <StyledTableCell align="left">
      <BeautyMoneyFormat
        money={price}
        fmt={serviceCurrencyFmt}
        iso4217_code={iso4217Code}
      />
    </StyledTableCell>

    <StyledTableCell align="left">
      <Moment format="DD.MM.YYYY HH:mm">
        {creationDatetime}
      </Moment>
    </StyledTableCell>

    <StyledTableCell align="left">
      <span>
        <Link
          to="#"
          onClick={onTrClick}
          className={cn('option', 'link')}
        >
          <EmailIcon className="hint" />{' '}
          <FormattedMessage
            id="send_by"
            defaultMessage="Send by {source}"
            values={{ source: 'email' }}
          />
        </Link>
        <Link
          to="#"
          onClick={() => {
            onDownloadPdf(client_id, id, `${fileName}.pdf`);
          }}
          className={cn('option', 'link')}
        >
          <PictureAsPdfIcon className="hint" />{' '}
          <FormattedMessage
            id="download"
            defaultMessage="download {source}"
            values={{ source: 'pdf' }}
          />
        </Link>
        <Link
          to={`/print/document/pdf/${client_id}/documents/${id}`}
          target="_blank"
          className={cn('option', 'link')}
        >
          <AttachFileIcon className="hint" />{' '}
          <FormattedMessage
            id="download"
            defaultMessage="download {source}"
            values={{ source: 'html' }}
          />
        </Link>
      </span>
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  client_id: PropTypes.string.isRequired,
  client_name: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  creationDatetime: PropTypes.string.isRequired,
  crm: PropTypes.string.isRequired,
  documentType: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  iso4217Code: PropTypes.string.isRequired,
  onDownloadPdf: PropTypes.func.isRequired,
  onTrClick: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  serviceCurrencyFmt: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
};
