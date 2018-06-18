#!/usr/bin/pyhton
import sys
import umap
import httplib2
import urllib
import numpy as np
import json
from json import loads, dumps
from iteration_utilities import deepflatten


if len(sys.argv) < 5:
	print ('Usage preProcessData languajeFile1 file1 languajeFile2 file2 #ofPhrases')
	sys.exit()

lanF1 = sys.argv[1]
f1 = open(sys.argv[2], 'r')
lanF2 = sys.argv[3]
f2 = open(sys.argv[4], 'r')
f1Phrases = f1.read().split('\n')
f2Phrases = f2.read().split('\n')

print ('Encoding '+sys.argv[2]+' in languaje '+sys.argv[1]+' and '+sys.argv[4]+' in languaje '+sys.argv[3])
data = {}

data['type'] = 'TSNE'
data['content'] = []

umapData = []
umapPhrases = []

n = min(len(f1Phrases), int(sys.argv[5]))
failed = 0

for i in range(n):

	print ('Encoding '+str(i)+'/'+str(n)+'\n')
	http = httplib2.Http()
	try:
		f1Origin = list(deepflatten(f1Phrases[i].split()[0:19], depth = 0))

		s = ''

		for j in f1Origin:
			s = s+j+' '

		f1Origin = s

		print ('Translating:', f1Origin)

		body = {"sentence": [f1Origin],
		        "lang": lanF1}
		 
		content = http.request("http://localhost:8888/matrix",
		                       method="POST",
		                       headers={'Content-type': 'application/json'},
		                       body=dumps(body) )[1]


		res = loads(content.decode()) 
		
		traducction = res['sentence_0']['matrix']
		f1 = list(deepflatten(traducction, depth = 2))

		umapData.append(f1)
		umapPhrases.append(f1Origin)

		f2Origin = list(deepflatten(f2Phrases[i].split()[0:19], depth = 0))

		s = ''

		for j in f2Origin:
			s = s+j+' '

		f2Origin = s

		print ('Translating:', f2Origin)

		body = {"sentence": [f2Origin],
		        "lang": lanF2}
		 
		content = http.request("http://localhost:8888/matrix",
		                       method="POST",
		                       headers={'Content-type': 'application/json'},
		                       body=dumps(body) )[1]


		res = loads(content.decode()) 
		
		traducction = res['sentence_0']['matrix']
		f2 = list(deepflatten(traducction, depth = 2))

		umapData.append(f2)
		umapPhrases.append(f2Origin)

		data['content'].append({
		 	'f1':f1Phrases[i],
		 	'weights_f1':f1,
		 	'f2':f2Phrases[i],
		 	'weights_f2':f2
		})
	except:
		print('FAILED')
		failed = failed + 1
	

n = int(len(umapPhrases) / 2)

embedding = umap.UMAP(n_neighbors=n,
                      min_dist=0.005,
                      metric='correlation').fit_transform(umapData)

with open('data_tSNE.json','w') as file:
	json.dump(data, file)

data = {}
data['type'] = 'SMAP'
data['content'] = []

j = 0


for i in range(n):
	data['content'].append({
	 	'f1':umapPhrases[j],
	 	'weights_f1':embedding[j].tolist(),
	 	'f2':umapPhrases[j + 1],
	 	'weights_f2':embedding[j + 1].tolist(),	 	
	})	
	j = j + 2


with open('data_umap.json','w') as file:
	json.dump(data, file)

print (str(failed)+ ' Failed.\n')