import { Image } from "react-native";
import { useEffect, useState } from "react";

const CharaPhotoInGame = ({
    idChara
}) => {
    const [dirAva, setDirAva] = useState("");

    useEffect(() => {
        if (idChara === 6) {
            setDirAva(require("../assets/image/chara/chara_tyo.png"));
        } else if (idChara === 3) {
            setDirAva(require("../assets/image/chara/chara_opip.png"));
        } else if (idChara === 1) {
            setDirAva(require("../assets/image/chara/chara_aldra.png"));
        } else if (idChara === 4) {
            setDirAva(require("../assets/image/chara/chara_suki.png"));
        } else if (idChara === 2) {
            setDirAva(require("../assets/image/chara/chara_hanip.png"));
        } else if (idChara === 5) {
            setDirAva(require("../assets/image/chara/chara_dhea.png"));
        }
    }, [idChara]);

    return (
        <Image source={dirAva} style={{height:55,width:55}}/>
    )

}

export default CharaPhotoInGame;