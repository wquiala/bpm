import List from "../CommonComponents/List";

function Main() {
    return (
        <List
            tableName="DailyFiles"
            endpoint="/load?type=POLIZA"
            uploadType="policy"
        />
    );
}

export default Main;