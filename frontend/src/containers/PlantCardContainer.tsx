import React from 'react'
import { PlantType } from '../models/plant';
import Plant, { PlantProps } from '../ui/Plant';
import { Omit } from '../utils/typesUtil';
export type PlantCardContainerProps = WithPlant | NewPlant

type WithPlant = {
    new?: false,
    plant: PlantType
}
type NewPlant = {
    new: true,
    onCancel: () => void
}

export default class PlantCardContainer extends React.Component<PlantCardContainerProps> {

    nameRef = React.createRef<HTMLInputElement>()
    fileRef = React.createRef<HTMLInputElement>()

    onSubmit = () => {
        if (this.nameRef.current && this.fileRef.current) {
            let plant: Omit<PlantType, '_id'> = {
                name: this.nameRef.current.value
            }
            const data = new FormData()
            data.append('file', this.fileRef.current!.files![0])
            fetch('/image', { method: 'POST', body: data }).then((res) => {

            })
        }
    }

    render() {
        return <Plant
            {...this.props}
            nameRef={this.nameRef}
            fileRef={this.fileRef}
            onSubmit={this.onSubmit}
        />
    }
}