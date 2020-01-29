import React from 'react'
import { PlantType } from '../store/models/plant';
import { Omit } from '../utils/typesUtil';
import PlantUI from '../ui/PlantUI';
export type PlantCardContainerProps = {
    plant: PlantType
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
        return <PlantUI
            refName={this.nameRef}
            onSubmit={this.onSubmit}
            plant={this.props.plant}
        />
    }
}