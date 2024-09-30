import List from '../CommonComponents/List';

function Main() {
   return <List tableName="AnuladasFiles" endpoint="/load?type=ANULADA" uploadType="anuladas" />;
}

export default Main;
