import { Link } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2 text-center">
            <img 
              src="https://bootdey.com/img/Content/avatar/avatar7.png" 
              alt="user" 
              className="rounded-circle" 
              width="80" 
              height="80" 
            />
          </div>
          <div className="col-md-8">
            <h5 className="mb-2">
              <i className="fa-solid fa-id-card-clip me-2"></i>
              {contact.name}
            </h5>
            <p className="mb-1">
              <i className="fa-solid fa-map-location-dot me-2"></i>
              {contact.address}
            </p>
            <p className="mb-1">
              <i className="fa-solid fa-square-phone me-2"></i>
              {contact.phone}
            </p>
            <p className="mb-0">
              <i className="fa-regular fa-envelope me-2"></i>
              {contact.email}
            </p>
          </div>
          <div className="col-md-2 text-end">
            <Link 
              to={`/update/${contact.id}`} 
              className="btn btn-outline-primary btn-sm me-2"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <button 
              className="btn btn-outline-danger btn-sm" 
              onClick={onDelete}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;