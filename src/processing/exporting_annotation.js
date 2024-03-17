export default class ExportingAnnotation{
    constructor(annotation_data, width, height, VIDEO_METADATA, image_data){
        console.log(width)
        console.log(height)
        this.frame_data = annotation_data
        this.width = width
        this.height = height
        this.metadata = VIDEO_METADATA
        this.image_data = image_data
    }

    get_frame_json(){
        var standard_annot = new Array(this.frame_data.length)
        console.log(this.metadata)
        console.log(this.frame_data)
        for(var i = 0; i < this.frame_data.length; i++){
            var curr = []
            if(this.frame_data[i] == []){
                console.log("Exporting error")
                continue;
            }
            var frame_objects = this.frame_data[i]
            if(frame_objects == undefined){
                console.log("Exporting error")
                continue;
            }
            
            for(var j = 0; j < frame_objects.length; j++){
                try {
                    console.log(frame_objects[j])
                    if(frame_objects[j] == undefined || frame_objects[j]['type'] !== "group"){
                        continue;
                    }
                    if (frame_objects[j]._objects == undefined){
                        continue;
                    }
                    if(frame_objects[j]._objects[0]['type'] === "rect"){
                        console.log(frame_objects[j])
                        var x = (frame_objects[j]['left'] / this.width) * this.metadata['horizontal_res']
                        var y = (frame_objects[j]['top'] / this.height) * this.metadata['vertical_res']
                        var width = ((frame_objects[j]['width'] * frame_objects[j]['scaleX']) / this.width) * this.metadata['horizontal_res']
                        var height = ((frame_objects[j]['height'] * frame_objects[j]['scaleY']) / this.height )* this.metadata['vertical_res']
                        var local_id = frame_objects[j]._objects[1]['text']
                        if(this.metadata.media_type == "in_image"){
                            curr.push({"type": "bounding_box","x": x, "y": y, "width": width, "height": height, "local_id": local_id,"fileName:": this.image_data[i]['name'], "dataType": "image"})
                        }else{
                            curr.push({"type": "bounding_box","x": x, "y": y, "width": width, "height": height, "local_id": local_id, "fileName:": this.metadata['name'], "dataType": "video"})
                        }
                        //curr.push({"type": "bounding_box","x": x, "y": y, "width": width, "height": height, "local_id": local_id})
                    }else if (frame_objects[j]._objects[0]['type'] === "polygon"){
                        var raw_points = frame_objects[j]._objects[0]['points']
                        var points = []
                        console.log(this.metadata)
                        console.log(this.metadata['horizontal_res'])
                        console.log(this.width)
                        console.log(this.height)
                        for(var k = 0; k < raw_points.length; k++){
                            var x = (raw_points[k]['x'] / this.width) * this.metadata['horizontal_res']
                            var y = (raw_points[k]['y'] / this.height) * this.metadata['vertical_res']
                            points.push({"x": x, "y": y})
                        }
                        var local_id = frame_objects[j]._objects[1]['text']

                        if(this.metadata.media_type == "in_image"){
                            curr.push({"type": "segmentation", "points": points, "local_id": local_id, "fileName:": this.image_data[i]['name'], "dataType": "image"})
                        }else{
                            curr.push({"type": "segmentation", "points": points, "local_id": local_id, "fileName:": this.metadata['name'], "dataType": "video"})
                        }
                        //curr.push({"type": "segmentation", "points": points, "local_id": local_id})
                    }else{
                        alert("Error in exporting annotation. Please check the annotation and try again.")
                    }
                } catch (error) {
                    console.log(error)
                }

            }

            standard_annot[i] = curr
        }
        return standard_annot
    }

    get_frame_json_fullCanvas(){
        var standard_annot = new Array(this.frame_data.length)
        console.log(this.metadata)
        for(var i = 0; i < this.frame_data.length; i++){
            var curr = []

            if(this.frame_data[i] == []){
                continue;
            }
            var frame_objects = this.frame_data[i]['objects']
            if(frame_objects == undefined){
                continue;
            }
            
            for(var j = 0; j < frame_objects.length; j++){
                console.log(frame_objects[j])
                if(frame_objects[j]['type'] !== "group"){
                    continue;
                }
                if(frame_objects[j]['objects'][0]['type'] === "rect"){
                    console.log(frame_objects[j])
                    var x = (frame_objects[j]['left'] / this.width) * this.metadata['horizontal_res']
                    var y = (frame_objects[j]['top'] / this.height) * this.metadata['vertical_res']
                    var width = ((frame_objects[j]['width'] * frame_objects[j]['scaleX']) / this.width) * this.metadata['horizontal_res']
                    var height = ((frame_objects[j]['height'] * frame_objects[j]['scaleY']) / this.height )* this.metadata['vertical_res']
                    var local_id = frame_objects[j]['objects'][1]['text']
                    if(this.image_data.length != 0){
                        curr.push({"type": "bounding_box","x": x, "y": y, "width": width, "height": height, "local_id": local_id,"fileName:": this.image_data[i]['name'], "dataType": "image"})
                    }else{
                        curr.push({"type": "bounding_box","x": x, "y": y, "width": width, "height": height, "local_id": local_id, "fileName:": this.metadata['name'], "dataType": "video"})
                    }
                    //curr.push({"type": "bounding_box","x": x, "y": y, "width": width, "height": height, "local_id": local_id})
                }else if (frame_objects[j]['objects'][0]['type'] === "polygon"){
                    var raw_points = frame_objects[j]['objects'][0]['points']
                    var points = []
                    for(var k = 0; k < raw_points.length; k++){
                        var x = (raw_points[k]['x'] / this.width) * this.metadata['horizontal_res']
                        var y = (raw_points[k]['y'] / this.height) * this.metadata['vertical_res']
                        points.push({"x": x, "y": y})
                    }
                    var local_id = frame_objects[j]['objects'][1]['text']

                    if(this.image_data.length != 0){
                        curr.push({"type": "segmentation", "points": points, "local_id": local_id, "fileName:": this.image_data[i]['name'], "dataType": "image"})
                    }else{
                        curr.push({"type": "segmentation", "points": points, "local_id": local_id, "fileName:": this.metadata['name'], "dataType": "video"})
                    }
                    //curr.push({"type": "segmentation", "points": points, "local_id": local_id})
                }

            }

            standard_annot[i] = curr
        }
        return standard_annot
    }

    get_frame_coco(){

    }
}