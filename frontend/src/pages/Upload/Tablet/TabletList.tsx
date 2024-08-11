import List from "../CommonComponents/List";

function Main() {
    return (
        <List
            tableName="DailyFiles"
            endpoint="/load?type=TABLETA"
            uploadType="tablet"
        />
    );
}

export default Main;