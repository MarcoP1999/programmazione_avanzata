import os
import cv2
import glob
import torch
import random
import requests
#import numpy as np
import torchvision
import torch.nn as nn
from io import BytesIO
import matplotlib.pyplot as plt

from PIL import Image
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