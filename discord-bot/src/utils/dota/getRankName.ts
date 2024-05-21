import { RanksEnum } from "../../enums/RanksEnum";
import RanksObjectEnum from "../../enums/RanksObjectEnum";

export default (rankId: RanksEnum): string => {
    return RanksObjectEnum[rankId];
}