import React from 'react'
import { PlantType } from '../models/plant';
import Plant, { PlantProps } from '../ui/Plant';
import { Omit } from '../utils/typesUtil';
import NewPlantUI from '../ui/NewPlantUI';

type NewPlant = {
    onCancel: () => void
}

export default class NewPlantCardContainer extends React.Component<NewPlant> {

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
        return <NewPlantUI
            nameRef={this.nameRef}
            fileRef={this.fileRef}
            onSubmit={this.onSubmit}
            onCancel={this.props.onCancel}
        />
    }
}