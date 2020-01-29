import { Omit, Callback } from "../utils/typesUtil";
import { PlantType } from "../store/models/plant";

export default {
    postPlant: (plant: Omit<PlantType, '_id' | 'mainPicture'>, file: string, callback: Callback<PlantType>) => {
        const data = new FormData()
        data.append('file', file)
        data.append('plant', '1')
        fetch('/image', { method: 'POST', body: data }).then((res) => res.json()).then((data: { _id: string }) => {
            const plantData: Omit<PlantType, '_id'> = {
                ...plant,
                mainPicture: data._id
            }
            return fetch('/api/rest/plant', { method: 'POST', body: JSON.stringify(plantData) })
        }).then(res => res.json()).then(plant => {

        }).catch
    }
}