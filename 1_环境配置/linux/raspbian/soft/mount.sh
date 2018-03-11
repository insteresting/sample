sudo umount /dev/sdb4
sudo umount /dev/sdc4
sudo mount /dev/sdb4 /samba -t ext4
sudo chmod 777 /samba
sudo mount /dev/sdc4 /var/www/html -t ext4
sudo chmod 777 /var/www/html
cd /opt/nat123linux
screen -dm mono nat123linux.sh autologin lganame keps091794

