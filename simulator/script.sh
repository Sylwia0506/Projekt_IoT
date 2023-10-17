i=0

while [ $i -lt 60 ]; do
  python main.py &
  sleep 1
  i=$(( i + 1 ))
done
