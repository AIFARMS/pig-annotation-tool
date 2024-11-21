# Getting Started with AVAT

This guide will show you how to use AVAT's front-end functionality.

## Key Bindings

The platform has a series of built in key binds that allow the user to employ different sampling strategies. Skipping through frames is accomplished with “e” for forward and “q” for backward, while “w” toggles the pause/play function. The “c” key is particularly useful for copying the previous annotation, thereby reducing repetitive tasks when annotating sequences with minimal changes. The “f” key is used to toggle the scrub mode, which is activated by default to allow for quick navigation through the video timeline.

- `e`: Skip forward to the next frame.
- `q`: Skip backward to the previous frame.
- `w`: Toggle pause/play for the video.
- `c`: Copy the previous annotation, useful for sequences with minimal changes.
- `f`: Toggle scrub mode for quick video timeline navigation.
- `a`: Add a new annotation.
- `r`: Remove the selected annotation.

## User Interface

### Video Playback and Annotation Area

- The user interface of the AVAT platform is divided into two main sections. The left section features the video playback area, where the media is displayed for annotation. This primary area is designed for clear visibility and interaction with the video content. On the right side of the video playback area, there is a structured annotation table. This table is organized to display a list of annotations corresponding to the video frames. Each entry in the table is associated with a specific annotation created within the video playback area. The table columns include details such as the local ID , the global ID(Glo), and descriptors such as posture, behavior, and a confidence score. There is also a deletion option (Del) for removing annotations as needed. The “Previous” tab allows users to visualize annotations from the previous frames. Above the video playback area, there is a navigation bar with options such as “Export” and “Instructions”, which contains functionality for data export and accessing user guidelines. The top right corner includes a frame indicator, showing the current frame out of the total number of frames, and playback control buttons like “Prev” for previous frame, “Play” for starting the video, and “Next” for advancing to the next frame of interest. On the right side of the navigation bar, there is an “Add” button, indicating a quick action to insert new annotations.

### Navigation and Functionality

- Above the video playback area, a navigation bar includes options for data export and accessing guidelines through the “Export” and “Instructions” tabs.
- A frame indicator in the top right corner displays the current frame number.
- Playback control buttons include “Prev” for the previous frame, “Play” for starting the video, and “Next” for advancing to the next frame.
- An “Add” button allows for quick insertion of new annotations.

## Media Upload and Initialization

### Uploading Videos

1. Access the “Upload” tab to start.
2. Select the media type to be annotated from the Format dropdown.
3. Specify the number of video streams in the “Stream Number” field.
4. Click “Browse” next to “Video Upload” and choose the file from the local directory.
5. Pre-defined ethogram labels or existing annotations can be uploaded using the “Column Upload” and “Annotation Upload” buttons.
6. Ensure the “Frame Rate” matches the video’s frame rate.
7. Set the “Skip Value” to determine the frame sampling interval.
8. Click “Upload” to process and display the first frame, indicating readiness for annotation.

### Uploading Images

- Ensure images are in a 16:9 aspect ratio for optimal performance.

### Initialization workflow

- Initiating the annotation platform starts with accessing the “Upload” tab. First, users select the type of media Format dropdown to denote the type of media to be annotated. Then, they specify the number of video streams for upload in the “Stream Number” field, inputting “1” for a single video. Users upload their video by clicking “Browse” next to “Video Upload” and choosing the file from their local directory. If there are pre-defined ethogram labels or existing annotations, these can be uploaded using the “Column Upload” and “Annotation Upload” buttons, respectively. The “Frame Rate” field should match the video’s frame rate to synchronize the annotations with the video. The “Skip Value” determines the frame sampling interval. A default value of “1” means every frame will be sampled; a higher value will skip frames and reduce the sampling frequency. After selecting the files and setting the parameters, users click the “Upload” button to start the upload process. The platform processes the videos or images, and upon completion, the first frame of the video is displayed in the playback area, indicating readiness to begin annotation work. This process is designed to be simple and efficient, ensuring users can quickly start annotating their videos with minimal setup.

## Annotation Types and Process

- **Behavior Annotation**: For labeling behaviors or postures. Keybinds: `1` and `a`.
- **Bounding Box and Segmentation**: For bounding boxes, users click and drag the mouse to draw a rectangle around the object of interest. Resizing is easily done by dragging the small squares at the corners of the bounding box. Each box is automatically assigned a number which links it to a corresponding entry in the table on the interface for easy tracking. For segmentation, users click to place points on the periphery of the object, which are then joined to form a polygon. Clicking on the first point closes and completes the shape. Should adjustments be required, selecting “Edit Segmentation” enables the editing mode, allowing users to move existing points for precise placement.
- **Upload a custom ethogram**: To incorporate existing ethogram labels into the annotation process, users must modify the template file named data_column.json. This file acts as a template for the ethogram and posture labels within the system. Users can add or remove labels by editing this JSON file, which allows the system to display the customized ethogram for annotators. This step is essential for ensuring that behavior scoring and annotation processes align with the specific ethogram developed for the study.

## Customizing the Ethogram with `data_column.json`

To tailor the AVAT platform's annotation system to your study's specific needs, you'll need to modify the `data_column.json` template. This file dictates the structure of the annotation table and the options available in dropdown menus for annotating videos. Follow the steps below to customize this file.

### Step 1: Accessing the Template

The template can be found at the AVAT GitHub repository: [data_column.json](https://github.com/AIFARMS/AVAT/data_column.json). Download or view this file to begin customization.

### Step 2: Understanding the File Structure

The `data_column.json` consists of two primary sections:

- `columns`: Defines the headers and accessors for data columns in the annotation interface.
- `select_data`: Specifies options for dropdown menus in the annotation tool, such as confidence levels, behaviors, and postures.

### Step 3: Editing the File

#### Columns Section

- **Headers and Accessors**: Modify the `Header` (column name) and `accessor` (data key) according to your data structure. For example:

    ```json
    "columns": [
        {
            "Header": "id",
            "accessor": "id"
        },
        {
            "Header": "Global ID",
            "accessor": "global_id"
        },
        ...
    ]
    ```

- **Adding/Removing Columns**: To add a column, insert a new object with `Header` and `accessor` keys. To remove, delete the respective object.

#### Select Data Section

- **Dropdown Options**: Define options for dropdown menus by adding objects with `value` (data value) and `label` (display label). For example:

    ```json
    "select_data": {
        "confidence": [
            {"value": "High", "label": "High"},
            ...
        ],
        "behavior": [
            {"value": "Feeding", "label": "Feeding"},
            ...
        ],
        ...
    }
    ```

- **Modifying Options**: Add or remove options by editing the arrays under each dropdown category.

### Example `data_column.json` Structure

Below is an example snippet illustrating the structure of `data_column.json`. This includes columns for identifiers, confidence, behaviors, and postures, along with dropdown menu options for each category:

```json
{
    "columns": {
        "Header": "Annotations",
        "columns": [
            {
                "Header": "id",
                "accessor": "id"
            },
            {
                "Header": "Global ID",
                "accessor": "global_id"
            },
            {
                "Header": "Confidence",
                "accessor": "confidence"
            },
            {
                "Header": "Behavior",
                "accessor": "behavior"
            },
            {
                "Header": "Posture",
                "accessor": "posture"
            }
        ]
    },
    "select_data": {
        "confidence": [
            {"value": "No occlusion", "label": "No occlusion"},
            ...
        ],
        "behavior": [
            {"value": "Feeding", "label": "Feeding"},
            ...
        ],
        "posture": [
            {"value": "Standing", "label": "Standing"},
            ...
        ]
    }
}
```

## Annotation Workflow

1. **Preparation**
   - Before starting, ensure that your media files are ready for upload. This includes having videos in supported formats and images, if applicable, prepared in a 16:9 aspect ratio `.mp4` to ensure maximum compatibility with the AVAT platform.

2. **Uploading Media**
   - Navigate to the “Upload” tab on the platform's interface.
   - For videos, select the type of media to be annotated from the Format dropdown menu. Specify the number of video streams for upload in the “Stream Number” field.
   - Click “Browse” next to “Video Upload” and select the file from your local directory. If you have predefined ethogram labels or existing annotations, use the “Column Upload” and “Annotation Upload” buttons to upload these files.
   - Ensure the “Frame Rate” field matches the video’s frame rate for synchronization. Adjust the “Skip Value” to set the frame sampling interval according to your needs.
   - Click “Upload” to initiate the processing of the videos or images. Once complete, the first frame of the video will be displayed in the playback area, indicating readiness for annotation.

3. **Starting the Annotation Process**
   - Begin annotating the video by using the key binds to navigate through frames and manage annotations. You can switch between different annotation modes (e.g., behavior annotation, bounding box) as needed to accurately label the video content.
   - For behavior annotations, use the `1` and `a` keys to add labels for behaviors or postures that don't have visual attributes.
   - To create bounding boxes around objects of interest, switch to the bounding box mode with the `2` key and use the `a` key to add a new bounding box. Resize and position the box using your mouse, ensuring it accurately encompasses the object.

4. **Reviewing and Adjusting Annotations**
   - Periodically review your annotations to ensure accuracy and completeness. Use the navigation controls and key bindings to revisit previous frames and adjust annotations as necessary.
   - If you need to remove or edit an annotation, utilize the corresponding key bindings (`r` for removal, `e` and `q` for navigation) and mouse actions to make precise adjustments.

5. **Exporting Annotated Data**
   - Once you have completed the annotation process, you can export your annotated data for further analysis or sharing with your team. Use the "Export" option in the navigation bar to save your work in the desired format.

## Sampling rate

Ensure video frame rates are accurately inputted for synchronization. Adjust sampling values as needed for your project's requirements. 
Given that manually labeling every image or frame of a video is an inefficient process, our system adopts an approach that requires users to annotate a sparse set of frames, also referred to as the sampling rate. The sampling rate is dependent on the research question, and we recommend two sampling rate methods: static sampling and dynamic sampling. 

`Static sampling` is a simple strategy that aims to annotate animals on a static interval where the N intermediate frames are skipped. This strategy is perfect for videos where an set of ethogram labels has already been specified as the user is not looking out for odd or new behaviors that might occur. 
For videos that have a lot of movement, we set N to be low, whereas, for videos that have small amounts of movement, we can set N to be higher. As such, the primary goal of the user is to minimize N such that key elements of the video are not left out by the skipped frames. Having N too low will result in the user wasting time annotating frames that could easily be interpolated and having a high N will result in key frames being skipped causing the user to comb through the individual frames manually, wasting time. 
Assuming a suitable ethogram is provided, one can determine the N as the minimum time t it takes for a single event to happen between frames. Specifically, N would be set relative to the activity level of the animals in the video. For example, if the animals were extremely active and engaging in lots of social behaviors through the course of the video, N would be set low as it helps capture nuanced behaviors that would be missed with a high N. Likewise, if the animals were docile and not social, N would set high since not much activity would have happened between frames and the ethogram would only track behaviors that occur through the course of several frames.
Functionally, static sampling involves asking the user for N. This value should be set at the start and should be manually set by the user at all times. We recommend a default value of 1 frame per second of video as a baseline N value. 

`Dynamic sampling` is a strategy that aims to annotate animals for use in the creation of an ethogram. This strategy allows the user to decide when to annotate based on the happenings in the video. This allows the collection of new behaviors and adds the ability for the user to add notes about what is occurring for help in ethogram development. Since the choice of which frames to annotate is on the user, it adds variance in the results and time were taken to complete annotations. For a trained annotator, using dynamic sampling is beneficial since it allows for frames that are not of interest to be skipped in favor of more data-rich frames. However, this sampling strategy requires a seasoned annotator. Unskilled annotators are likely to be less efficient while employing a dynamic sampling strategy since they are not aware of which frames contain the most important features. We recommend using this strategy only if the user is a trained annotator. Functionally, dynamic sampling is implemented by a pause/play option and the ability to scrub through the video. Adding functionality such as playback speed significantly helps the user as they are able to skip through the irrelevant frames with ease. Allowing the user to control the frame level is key as some frames might have changes in between single frames. 
The platform has a series of built in keybinds that allow the user to employ different sampling strategies. Skipping through frames is accomplished with “e” for forward and “q” for backward, while “w” toggles the pause/play function. The “c” key is particularly useful for copying the previous annotation, thereby reducing repetitive tasks when annotating sequences with minimal changes. The “f” key is used to toggle the scrub mode, which is activated by default to allow for quick navigation through the video timeline.


## Troubleshooting and Feedback

For any issues or feedback, please use the "Report" button in the top toolbar to submit a detailed report.

