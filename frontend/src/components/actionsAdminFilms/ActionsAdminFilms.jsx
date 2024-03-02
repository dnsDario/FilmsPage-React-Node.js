import CreateFilms from "../createFilms/CreateFilms";
import DeleteFilms from "../deleteFilms/DeleteFilms";
import "./ActionsAdminFilms.css"


export default function ActionsAdminFilms(){



    return (
      <>
        <div className="formsFilms">
          <div className="formFilms_Delete">
            <DeleteFilms></DeleteFilms>
          </div>
          <div className="formFilms_Create">
            <CreateFilms></CreateFilms>
          </div>
        </div>
      </>
    );
}