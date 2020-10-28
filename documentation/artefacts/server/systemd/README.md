# `systemd`

`systemd` is a program used to manage the system.
One such use is to manage services (dhcpcd, sshd, vpns, servers, etc)

## Services

Certificates obtained from Let's Encrypt have an expiry data of three month.
Automated renewal of certificates can de done through certbot.

The package for certbot provides us with a sample service unit file to renew certificates.
To see where this file is, run the following command.

```bash
systemctl status certbot.service
```

As you will note in the output, there there is a drop in file for this service.
The purpose of this file is to edit the provided unit file without editing the original file.

## Timers

A timer unit for certbot is also supplied to us by the package.
This timer will run attempt to run the certbot service to renew the SSL certificates twice a day.
To check its status and additional information, run the following command

```bash
systemctl status certbot.timer
```

This unit is used as is and requires no modifications.

## Additional Information

For more information, consult the system manual, `man systemd`, or view the online version at https://www.freedesktop.org/software/systemd/man/systemd.html.

Replace `systemd` with the following to see more info.

 - `systemctl`
 - `systemd.unit`
 - `systemd.service`
 - `systemd.timer`
