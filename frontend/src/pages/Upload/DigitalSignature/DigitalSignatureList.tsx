import List from "../CommonComponents/List";

function Main() {
    return (
        <List
            tableName="DailyFiles"
            endpoint="/load?type=FIRMA_DIGITAL"
            uploadType="digitalSignature"
        />
    );
}

export default Main;