use std::process::Command;
use std::{thread, time};
use serde::{Serialize, Deserialize};

fn check_last_song(artist: String, album: String, title: String) {
    
}

// TODO: make a struct out of the song metadata if there's enough time

// Right now loops without actually checking if the song has changed. 
// Still figuring out the borrow checker.
fn main() {
    loop {
        let mut artist: String = String::new();
        let mut album: String = String::new();
        let mut title: String = String::new();

        let mut artist_cmd = Command::new("ncmpcpp");
        artist_cmd.args(&["--current-song", "%a"]);

        match artist_cmd.output() {
            Ok(o) => {
                let artist_ref = &mut artist;
                *artist_ref = String::from_utf8_lossy(&o.stdout).to_string();
            },
            Err(_e) => {
                println!("{}", _e);
            }
        }

        let mut album_cmd = Command::new("ncmpcpp");
        album_cmd.args(&["--current-song", "%b"]);

        match album_cmd.output() {
            Ok(o) => {
                let album_ref = &mut album;
                *album_ref = String::from_utf8_lossy(&o.stdout).to_string();
            },
            Err(_e) => {
                println!("{}", _e);
            }
        }

        let mut title_cmd = Command::new("ncmpcpp");
        title_cmd.args(&["--current-song", "%t"]);

        match title_cmd.output() {
            Ok(o) => {
                let title_ref = &mut title;
                *title_ref = String::from_utf8_lossy(&o.stdout).to_string();
            },
            Err(_e) => {
                println!("{}", _e);
            }
        }

        #[derive(Debug, Serialize, Deserialize)]
        struct Post {
            artist: String,
            album: String,
            title: String,
            userId: i32,
        }

        let new_post = Post {
            artist: String::from(artist),
            album: String::from(album),
            title: String::from(title),
            userId: 1,
        };

        let client = reqwest::Client::new();
        let res = client.post("http://localhost:8081/api/addlisten")
            .json(&new_post)
            .send();

        match res {
            Ok(o) => {
                println!("{:?}", o);
            }
            Err(e) => {
                println!("{:?}", e);
            }
        }
        thread::sleep(time::Duration::from_millis(4000));
    }
}
