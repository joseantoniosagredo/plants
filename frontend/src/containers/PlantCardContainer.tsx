import React from 'react'
import { PlantType } from '../models/plant';
import Plant from '../ui/Plant';
import { Omit } from '../utils/typesUtil';

export default class PlantCardContainer extends React.Component<{ plant: PlantType }> {

    nameRef = React.createRef<HTMLInputElement>()
    fileRef = React.createRef<HTMLInputElement>()

    onSubmit = () => {
        if (this.nameRef.current && this.fileRef.current) {
            let plant: Omit<PlantType, '_id'> = {
                name: this.nameRef.current.value
            }
            const data = new FormData()
            data.append('file', this.fileRef.current!.files![0])
            data.append('plant', '1')

            fetch('/image', { method: 'POST', body: data }).then((res) => {

            })
        }

    }

    render() {
        return <Plant
            plant={this.props.plant}
            nameRef={this.nameRef}
            fileRef={this.fileRef}
            onSubmit={this.onSubmit}
        />
    }
}