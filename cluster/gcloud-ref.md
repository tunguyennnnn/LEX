	gcloud beta container \
	 --project "<our-PROJECT-ID>" \
	 clusters create "lex-cluster" \
	 --zone "us-east1-f" \
	 --machine-type "n1-standard-1" \
	 --num-nodes "2" \
	 --network "default"

	gcloud compute disks create \
	 --project "<our-PROJECT-ID>" \
	 --zone "us-east1-f" \
	 --size 200GB \
	 mongo-disk

	gcloud compute forwarding-rules list

	gcloud container clusters get-credentials lex-cluster

	gcloud auth login

	gcloud components update

	docker tag myapp gcr.io/<YOUR-PROJECT-ID>/myapp
	gcloud docker push gcr.io/<YOUR-PROJECT-ID>/myapp
