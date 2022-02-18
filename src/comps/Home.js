import React, { useState, useContext } from "react";
import { Grid, Paper, Typography, Table, TableBody, TableRow, TableCell, Button, makeStyles } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import Day from "./Day";
import { ColorModeContext } from "./context/ThemeProvider";

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1),
		height: "100%"
	},
	virtCenter: {
		display: "flex",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		minHeight: "100%"
	},
	virtCenterChild: {
		padding: theme.spacing(1)
	},
	bold: { fontWeight: "bold" },
	html: {
		"& *": {
			margin: 0
		}
	},
	body: {
		backgroundColor: theme.palette.bodyBackground
	},
	noMargin: {
		margin: 0,
		width: "100%",
	},
	button: {
		height: "100%",
		textAlign: "center"
	},
	fullscreen: {
		position: "fixed",
		height: "100%",
		width: "100%",
		top: "0",
		left: "0",
		zIndex: "1000"
	},
	relative: {
		position: "relative"
	},
	spacer: {
		display: "none",
		[theme.breakpoints.only("md")]: {
			display: "block"
		}
	}
}));

const QUERY = gql`
	query {
		today {
			block
			testing
			schedule {
				schedule
				name
			}
		}
		currentAnnouncements {
			announcement
			category
		}
		upcomingEvents {
			date
			name
			id
		}
	}
`;

function Home() {
	const classes = useStyles();
	const toggleColorMode = useContext(ColorModeContext)

	const { loading, error, data } = useQuery(QUERY);
	const [fullscreen, setFullscreen] = useState(false)

	if (loading) return <Typography align="center">Loading...</Typography>;
	if (error) {
		console.error(error);
		return <Typography align="center">Error grabbing data: {error.messsage}</Typography>;
	}

	return (
		<div className={`${classes.virtCenter} ${classes.body}`}>
			<Grid
				container
				justifyContent="center"
				alignItems="stretch"
				spacing={1}
				className={`${classes.virtCenterChild} ${classes.noMargin}`}
			>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={fullscreen ? `${classes.paper} ${classes.fullscreen}` : `${classes.paper} ${classes.relative}`}>
						<div className={classes.virtCenter}>
							<div className={classes.virtCenter} style={{ flexDirection: "column" }}>
								{data.today ? (
									<Day today={data.today} setFullscreen={setFullscreen} fullscreen={fullscreen} />
								) : (
									<Typography className={classes.bold}>No schedule data for today.</Typography>
								)}
							</div>
						</div>
					</Paper>
				</Grid>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography align="center" className={classes.bold}>
							This Week
						</Typography>
						<Table>
							<TableBody>
								{data.upcomingEvents.map(ev => (
									<TableRow key={ev.id}>
										<TableCell>
											{
												["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
													new Date(ev.date).getUTCDay()
												]
											}
											, {ev.date.split("-")[1]}/{ev.date.split("-")[2]}
										</TableCell>
										<TableCell>{ev.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">
							Quick Links
						</Typography>
						<Grid
							container
							alignItems="stretch"
							alignContent="center"
							justifyContent="space-around"
							spacing={1}
						>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" onClick={toggleColorMode}>
									Toggle Dark Mode
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://healthscreening.schools.nyc/">
									Health Screening
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuy.libguides.com/stuylib">
									Library Website
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://auth.ioeducation.com/users/sign_in">
									PupilPath/Skedula
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuy.entest.org/Stuyvesant%20HS%20Early%20Excuse%20form%202021-22.pdf">
									Early Excuse Form
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://docs.google.com/forms/d/e/1FAIpQLSe9RTY0O8GkvnBE-P0VSh3TsH-ry57hanE8t5nOnq9UH3z9KQ/viewform">
									Attendance Form
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuy.edu">
									Stuy Website
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={classes.button} fullWidth variant="contained" color="primary" href="https://stuysu.org">
									Student Union
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
			</Grid>
			<Grid
				container
				className={`${classes.virtCenterChild} ${classes.noMargin}`}
				justifyContent="center"
				alignItems="stretch"
				spacing={1}
			>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">
							General Announcements
						</Typography>
						<Typography
							className={classes.html}
							dangerouslySetInnerHTML={{
								__html:
									data.currentAnnouncements.find(ann => ann.category === "general")?.announcement ||
									"No Announcement Found"
							}}
						/>
					</Paper>
				</Grid>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
				<Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Typography className={classes.bold} align="center">
							Caucus Announcements
						</Typography>
						<Typography
							className={classes.html}
							dangerouslySetInnerHTML={{
								__html:
									data.currentAnnouncements.find(ann => ann.category === "caucus")?.announcement ||
									"No Announcement Found"
							}}
						/>
					</Paper>
				</Grid>
				<Grid item className={classes.spacer} xl={0} lg={0} md={3} sm={0} xs={0}/>
			</Grid>
		</div>
	);
}

export default Home;
