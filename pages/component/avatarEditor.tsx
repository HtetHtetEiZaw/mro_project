import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

interface AvatarEditorProps {
    image: string;
    scale?: number;

    picture: {
        cropperOpen: boolean;
        img: string;
        zoom: number;
        croppedImg: string;
    };
    setPicture: React.Dispatch<
        React.SetStateAction<{
            cropperOpen: boolean;
            img: string;
            zoom: number;
            croppedImg: string;
        }>
    >;
}

// interface AvatarEditorProps {
//     image: string;
//     scale?: number;
    
//     picture: {
//       cropperOpen: boolean;
//       img: string;
//       zoom: number;
//       croppedImg: string;
//     };
//     setPicture: (picture: {
//       cropperOpen: boolean;
//       img: string;
//       zoom: number;
//       croppedImg: string;
//     }) => void;
//     // other props
//   }


const AvatarEditorComponent: React.FC<AvatarEditorProps> = ({
    picture,
    setPicture,
    image,
    scale,
}) => {
    const editorRef = useRef<AvatarEditor | null>(null);
    // const [preview, setPreview] = useState<string | null>(null);
    // const [imageData, setImageData] = useState<String | null>(null);

    const handleSlider = (event: Event, value: number | number[]) => {
        setPicture({
          ...picture,
          zoom: value as number,
        });
      };

    const handleSave = () => {
        if (editorRef.current) {
            const canvasScaled = editorRef.current.getImageScaledToCanvas();
            const previewUrl = canvasScaled.toDataURL();
            setPicture({
                ...picture,
                img: previewUrl,
                cropperOpen: false,
                croppedImg: previewUrl,
            });
            // setImageData(previewUrl);
        }
    };

    const handleCancel = () => {
        setPicture({
            ...picture,
            cropperOpen: false,
        });
    };

    return (
        <div>
            {/* <AvatarEditor
                ref={editorRef}
                image={image}
                width={200}
                height={200}
                scale={scale}
                borderRadius={125}
                border={20}
                color={[255, 255, 255, 0.6]}
                rotate={0}
            />
            <Box>
                <Button variant='contained' onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
            </Box> */}
            {/* <Box display="block"> */}
                <AvatarEditor
                  ref={editorRef}
                  image={image}
                  width={200}
                  height={200}
                  borderRadius={125}
                  border={20}
                  color={[255, 255, 255, 0.6]}
                  rotate={0}
                //   scale={scale}
                  scale={picture.zoom}
                />
                <Slider
                  aria-label="raceSlider"
                  value={picture.zoom}
                  min={1}
                  max={10}
                  step={0.1}
                  onChange={handleSlider}
                ></Slider>
                <Box>
                  <Button variant="contained" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </Box>
              {/* </Box> */}
        </div>
    );
};

export default AvatarEditorComponent;
