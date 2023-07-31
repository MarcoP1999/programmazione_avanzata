import sys #reading .py input params
#import os
import cv2
#import glob
import torch
import json
#import random
#import requests
#import numpy as np
#import torchvision
#import torch.nn as nn
#from io import BytesIO

#from PIL import Image
from segment_anything import SamPredictor
from segment_anything import sam_model_registry
from segment_anything import SamAutomaticMaskGenerator


def measureAreas(masks):
	totalArea = 0
	areas = []
	for i in range(len(masks)):
		totalArea += masks[i].get('area')
	for i in range(len(masks)):
		areas.append( round(masks[i].get('area')/totalArea*100, 1) )
	return areas

def getTotalArea(masks):
	totalArea = 0
	for i in range(len(masks)):
		totalArea += masks[i].get('area')
	return totalArea



#--------------------------------------------------------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu");
#print(f"Using device: {device}");

model_type = "vit_b" #backbone we choose (lightest)
sam = sam_model_registry[model_type](checkpoint="./python/CHECKPOINT_sam_vit_b.pth")
sam.to(device=device)
mask_generator1 = SamAutomaticMaskGenerator(sam, points_per_batch=16)
predictor = SamPredictor(sam)


objList = []
for current in sys.argv[1].split(","):
	image = cv2.resize( cv2.imread(current), (224,224) )
	imageMask = mask_generator1.generate(image)

	maskObj = {
		"segmentedAreas" : len(imageMask),
		"totalarea": getTotalArea(imageMask),
		"objects": measureAreas(imageMask)
	}
	objList.append( json.dumps(maskObj) )
print( (str(objList)).replace("'", "") )