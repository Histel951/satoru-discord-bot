import { RanksEnum } from "../../enums/RanksEnum";
import { RanksShortedEnum } from "../../enums/RanksShortedEnum";

export default (rankId: number|string, isShort: boolean = false): string | undefined => {
    const rankName: string = RanksEnum[rankId as number];

    if (isShort && rankName !== undefined) {
        return RanksShortedEnum[rankName as keyof typeof RanksShortedEnum];
    }

    return rankName;
}