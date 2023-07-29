import sys #reading .py input params
#import os
import cv2
#import glob
import torch
#import random
#import requests
#import numpy as np
#import torchvision
#import torch.nn as nn
#from io import BytesIO

#from PIL import Image
from segment_anything import SamPredictor
from torch.utils.data import Dataset, DataLoader
from segment_anything import sam_model_registry
from segment_anything import SamAutomaticMaskGenerator

device = torch.device("cuda" if torch.cuda.is_available() else "cpu");
print(f"Using device: {device}");

model_type = "vit_b" #saved backbone
sam = sam_model_registry[model_type](checkpoint="./python/CHECKPOINT_sam_vit_b.pth")
sam.to(device=device)
mask_generator1 = SamAutomaticMaskGenerator(sam, points_per_batch=16)
predictor = SamPredictor(sam)
print("Now model configured")


image_path = str(sys.argv[1]);
image_information = cv2.imread(image_path)
image = cv2.resize(image_information, (224,224))
masks = mask_generator1.generate(image)

print(masks[1])
#print(getArea(masks))

def getArea(masks):
	print("Segmented obj:" + str(len(masks))+"\n\n")
	segmentedArea = 0
	for i in range(len(masks)):
		segmentedArea += masks[i].get('area')
	for i in range(len(masks)):
		print("Segmented item "+str(i)+ " is " + str( round(masks[i].get('area')/segmentedArea*100, 1)) +"% of total area")
	#stringify to JSON